<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	import { contactEmailSchema } from '$lib/types';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	/**
	 * @type {ActionData}
	 */
	export let form;

	$: data = form?.data;
	$: errors = {} || form?.errors;
	$: console.log('🚀 ~ file: ContactForm.svelte:17 ~ errors:', errors);

	$: selectedServices = [];
	$: selectedBudget = '';
	$: isToastOpen = false;
	// if form?.success is true, show toast
	$: if (form?.success && !isToastOpen) {
		isToastOpen = true;
		setTimeout(() => {
			if (isToastOpen) {
				form.success = false;
				isToastOpen = false;
			}
		}, 5000);
	}
	// function validate() {
	// 	if (selectedServices.length === 0) {
	// 		errors.services = ['Please select at least one service'];
	// 	} else {
	// 		errors.services = null;
	// 	}
	// }
	// onMount - set initial height of textarea to fit content (if any) on page load and add event listener to resize textarea on keyup event
	onMount(() => {
		const textareaEl = document.querySelector('textarea');
		// if (!textareaEl) return;

		textareaEl?.addEventListener('keyup', () => {
			textareaEl.style.height = AutoSize(textareaEl);
		});

		// AUTOSIZE TEXTAREA
		function AutoSize(textareaEl) {
			function resize() {
				let height = textareaEl.scrollHeight;

				if (window.getComputedStyle) {
					const styles = window.getComputedStyle(textareaEl);
					height -= parseInt(styles['padding-top']) + parseInt(styles['padding-bottom']);
				}

				textareaEl.style.height = `${height + 8}px`;
			}

			if (!textareaEl.oninput) {
				textareaEl.oninput = () => {
					resize();
				};
			} else {
				textareaEl.onkeyup = () => {
					resize();
				};
			}

			return { textareaEl, resize };
		}
	});
</script>

{#if isToastOpen}
	<div
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
		in:fly={{ duration: 800, easing: cubicOut, y: -100, x: 0 }}
		out:fly={{ delay: 200, duration: 800, easing: cubicIn, y: -100, x: 0 }}
		class="toast fixed top-0 end-0 m-3 p-4 rounded text-2xl sm:text-lg font-light sm:font-light uppercase bg-slate-100"
	>
		<p class="text-[--pink]">Thank you for your request!</p>
		<p class="text-[--pink]">I will contact you shortly.</p>
	</div>
{/if}
<div>
	<form method="POST" class="text-2xl sm:text-4xl font-light sm:font-thin uppercase" use:enhance>
		<div class=" w-full mb-8 items-baseline">
			<div class="whitespace-nowrap mb-4 inline-block text-[--pink]">Hi! My name is</div>

			<input
				type="text"
				name="name"
				id="name"
				placeholder="Type your name*"
				value={form?.errors ? data?.name : ''}
				class="w-full bg-inherit pb-2 border-b border-b-slate-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-transparent focus:pb-2 focus:border-b-[--pink]"
				on:blur={(e) => {
					try {
						// check if form has errors
						contactEmailSchema.pick({ name: true }).parse({ name: e.target.value });
						errors = form?.errors;
						console.log('CATCH', errors);
						data = { ...data, name: e.target.value };
					} catch (error) {
						// console.log(error.formErrors.fieldErrors);
						errors = error.formErrors.fieldErrors;
						console.log('CATCH', errors);
					}
				}}
			/>
			{#if errors?.name}
				<span class="text-sm font-normal bg-rose-500 p-2">{errors.name[0]}</span>
			{/if}
		</div>

		<fieldset class="w-full mb-8">
			<legend class="mb-6 whitespace-nowrap md:mr-4 inline-block text-[--pink]"
				>I'm requesting:</legend
			>
			<div class="flex flex-wrap w-full justify-start gap-4">
				<input
					type="checkbox"
					name="service"
					id="service-1"
					value="development"
					aria-labelledby="service-label-1"
					checked={data?.service?.includes('development') || false}
					bind:group={selectedServices}
				/>
				<!-- accessibility : use `label id` and `input aria-labelledby` for correct voiceover -->
				<label
					id="service-label-1"
					for="service-1"
					class="text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer focus-within:border-[--pink]"
				>
					Website Development
				</label>
				<input
					type="checkbox"
					name="service"
					id="service-2"
					value="design"
					aria-labelledby="service-label-2"
					checked={data?.service?.includes('design') || false}
					bind:group={selectedServices}
				/>
				<label
					id="service-label-2"
					for="service-2"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					Website Design
				</label>
				<input
					type="checkbox"
					name="service"
					id="service-3"
					value="maintenance"
					aria-labelledby="service-label-3"
					checked={data?.service?.includes('maintenance') || false}
					bind:group={selectedServices}
				/>
				<label
					id="service-label-3"
					for="service-3"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					Website Maintenance
				</label>
			</div>
			{#if errors?.services || form?.errors?.service}
				<span class="text-sm font-normal bg-rose-500 p-2"
					>{error.services[0] || form?.errors?.service}</span
				>
			{/if}
		</fieldset>

		<fieldset class="w-full mb-8">
			<legend class="mb-6 whitespace-nowrap md:mr-4 inline-block text-[--pink]"
				>My budgest is:</legend
			>
			<div class="flex w-full flex-wrap gap-4 justify-start">
				<input
					type="radio"
					name="budget"
					id="1500"
					value="500-1.5k"
					checked={data?.budget === '500-1.5k' || false}
					bind:group={selectedBudget}
				/>
				<label
					for="1500"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					€ 500 - 1.5k
				</label>

				<input
					type="radio"
					name="budget"
					id="3000"
					value="1.5k-3k"
					checked={data?.budget === '1.5k-3k' || false}
					bind:group={selectedBudget}
				/>
				<label
					for="3000"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					€ 1.5k - 3k
				</label>

				<input
					type="radio"
					name="budget"
					id="5000"
					value="3k-5k"
					checked={data?.budget === '3k-5k' || false}
					bind:group={selectedBudget}
				/>
				<label
					for="5000"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					€ 3k - 5k
				</label>

				<input
					type="radio"
					name="budget"
					id="10000"
					value="5k-10k"
					checked={data?.budget === '5k-10k' || false}
					bind:group={selectedBudget}
				/>
				<label
					for="10000"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					€ 5k - 10k
				</label>

				<input
					type="radio"
					name="budget"
					id="max"
					value="10k+"
					checked={data?.budget === '10k+' || false}
					bind:group={selectedBudget}
				/>
				<label
					for="max"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					€ 10k+
				</label>
			</div>
			{#if form?.errors?.budget}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.budget}</span>
			{/if}
		</fieldset>

		<div class="w-full mb-8 items-baseline">
			<div class="whitespace-nowrap mb-4 inline-block text-[--pink]">You can reach me at:</div>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Type your contact email*"
				value={data?.email || ''}
				class="w-full h-full bg-inherit pb-2 border-b border-b-slate-500 focus:outline-none focus:ring focus:ring-inset focus:ring-transparent focus:pb-2 focus:border-b-[--pink]"
				on:change={(e) => {
					try {
						contactEmailSchema.pick({ email: true }).parse({ email: e.target.value });
						errors = form?.errors;
						data = { ...data, email: e.target.value };
					} catch (error) {
						errors = error.formErrors.fieldErrors;
						console.log('CATCH', errors);
					}
				}}
			/>
			{#if errors?.email}
				<span class="text-sm font-normal bg-rose-500 p-2">{errors.email[0]}</span>
			{/if}
		</div>

		<div class="relative w-full mb-8 items-baseline">
			<div class="whitespace-nowrap mr-4 mb-6 inline-block text-[--pink]">Here is brief info:</div>
			<textarea
				rows="1"
				name="message"
				id="message"
				placeholder="Type your request* "
				value={form?.errors ? data?.message : ''}
				class="resize-none w-full bg-inherit pb-2 border-b border-b-slate-500 focus:outline-none focus:ring focus:ring-inset focus:ring-transparent focus:pb-2 focus:border-b-[--pink]"
				on:keyup={(e) => {
					// validate with zod
					try {
						// check if form has errors
						contactEmailSchema.pick({ message: true }).parse({ message: e.target.value });
						errors = form?.errors;
						// console.log('CATCH', errors);
						data = { ...data, message: e.target.value };
					} catch (error) {
						// console.log(error.formErrors.fieldErrors);
						errors = error.formErrors.fieldErrors;
					}
				}}
			/>
			{#if errors && errors.message}
				<span class=" absolute -bottom-8 left-0 text-sm font-normal p-2">{errors.message[0]}</span>
			{/if}
		</div>

		<div class=" text-right">
			<button
				disabled={!data?.name ||
					!data?.email ||
					!data?.message ||
					selectedServices.length === 0 ||
					selectedBudget === ''}
				type="submit"
				class="text-base sm:text-2xl whitespace-nowrap border-2 border-blue-500 bg-blue-500 rounded-full py-2 px-4 cursor-pointer hover:bg-blue-400 duration-200 hover:border-transparent"
				>Send Request</button
			>
		</div>
	</form>
</div>

<style>
	textarea {
		overflow-wrap: break-word;
		line-break: after-white-space;
	}

	input:checked + label {
		border: 2px solid transparent;
		background-color: var(--pink);
	}

	input:focus + label {
		border: 2px solid var(--pink);
	}
	input[type='checkbox'],
	input[type='radio'] {
		appearance: none;
	}

	/* force input style on autofill */
	input:-webkit-autofill {
		background-color: transparent !important;
		-webkit-box-shadow: 0 0 0 80px black inset;
		-webkit-text-fill-color: #fff !important;
	}
	button:disabled {
		cursor: not-allowed;
		background: gray;
		border: transparent;
		opacity: 0.5;
	}
</style>
