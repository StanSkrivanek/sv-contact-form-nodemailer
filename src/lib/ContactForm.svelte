<script>
	// @ts-nocheck

	import { enhance } from '$app/forms';
	// import { ActionData } from "$app/types";
	import { onMount } from 'svelte';

	/**
	 * @type {ActionData}
	 */
	export let form;

	$: data = form?.data;
	$: selectedServices = [];
	$: selectedBudget = '';

	// onMount - get initial values for font size and textarea height to calculate height on input change when new line is added
	onMount(() => {
		const textareaEl = document.querySelector('textarea');
		if (!textareaEl) return;

		textareaEl.style.height = textareaEl.scrollHeight + 'px';
		textareaEl?.addEventListener('keyup', () => {
			// textareaEl.style.height = calcHeight(textareaEl.value) + 'px';
			textareaEl.style.height = AutoSize(textareaEl);
		});

		// AUTOSIZE TEXAREA TEST
		function AutoSize(textareaEl) {
			// textareaEl.className += 'js-autosize';

			function resize() {
				// textareaEl.style.height = 'auto';

				var height = textareaEl.scrollHeight;

				if (window.getComputedStyle) {
					var styles = window.getComputedStyle(textareaEl);

					height -= parseInt(styles['padding-top']) + parseInt(styles['padding-bottom']);
				}

				textareaEl.style.height = height + 8 + 'px';
			}

			if (!textareaEl.oninput) {
				textareaEl.oninput = function () {
					resize();
				};
			} else {
				textareaEl.onkeyup = function () {
					resize();
				};
			}

			return { textareaEl: textareaEl, resize: resize };
		}
	});
</script>

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
				required
				class="w-full bg-inherit pb-2 border-b border-b-slate-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-transparent focus:pb-2 focus:border-b-[--pink]"
			/>
			{#if form?.errors?.name}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.name[0]}</span>
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
					class="text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
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
			{#if form?.errors?.service}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.service}</span>
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
				required
				class="w-full h-full bg-inherit pb-2 border-b border-b-slate-500 focus:outline-none focus:ring focus:ring-inset focus:ring-transparent focus:pb-2 focus:border-b-[--pink]"
			/>
			{#if form?.errors?.email}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.email}</span>
			{/if}
		</div>

		<div class="w-full mb-8 items-baseline">
			<div class="whitespace-nowrap mr-4 mb-6 inline-block text-[--pink]">Here is brief info:</div>
			<textarea
				rows="1"
				name="message"
				id="message"
				placeholder="Type your request* "
				value={form?.errors ? data?.message : ''}
				required
				class="resize-none w-full bg-inherit pb-2 border-b border-b-slate-500 focus:outline-none focus:ring focus:ring-inset focus:ring-transparent focus:pb-2 focus:border-b-[--pink]"
			/>
			{#if form?.errors?.message}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.message}</span>
			{/if}
		</div>

		<div class=" text-right">
			<button
				type="submit"
				class="text-base sm:text-2xl whitespace-nowrap border-2 border-blue-500 bg-blue-500 rounded-full py-2 px-4 cursor-pointer hover:bg-blue-400 duration-200 hover:border-transparent"
				>Send request</button
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

	input[type='checkbox'],
	input[type='radio'] {
		/* visibility: hidden; */
		display: none;
	}

	/* force input style on autofill */
	input:-webkit-autofill {
		background-color: transparent !important;
		-webkit-box-shadow: 0 0 0 80px black inset;
		-webkit-text-fill-color: #fff !important;
	}
</style>
