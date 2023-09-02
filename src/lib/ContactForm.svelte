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
	$: console.log('🚀 ~ file: ContactForm.svelte:12 ~ form:', form);
	$: console.log('🚀 ~ file: ContactForm.svelte:13 ~ data:', data);

	$: selectedServices = [];
	$: selectedBudget = '';

	// onMount - get initial values for font size and textarea height to calculate height on input change when new line is added
	onMount(() => {
		const textareaEl = document.querySelector('textarea');
		if (!textareaEl) return;

		// GET - dynamic font size on load as number
		let fontSize = Number(
			window.getComputedStyle(textareaEl).getPropertyValue('font-size').slice(0, -2)
		);

		// set textarea height init value
		const textAreaHeight = calcHeight(textareaEl.value) + 'px';
		textareaEl.style.height = textAreaHeight;

		// Calculate height of textarea
		function calcHeight(value = '') {
			let numberOfLineBreaks = (value.match(/\n/g) || []).length;
			let newHeight = fontSize + numberOfLineBreaks * fontSize * 1.1 + 16;
			return newHeight;
		}
		textareaEl?.addEventListener('keyup', () => {
			textareaEl.style.height = calcHeight(textareaEl.value) + 'px';
		});
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
				class="w-full bg-inherit border-b border-b-slate-500 focus:outline-none focus:rounded-md focus:ring-1 focus:ring-inset focus:ring-[--pink] focus:p-1 focus:border-none"
			/>
			{#if form?.errors?.name}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.name[0]}</span>
			{/if}
		</div>

		<fieldset class="w-full mb-8">
			<legend class="mb-6 whitespace-nowrap md:mr-4 inline-block text-[--pink]"
				>I'm requesting:</legend
			>
			<div class="flex flex-wrap w-full gap-4">
				<!-- accessibility : use `label id` and `input aria-labelledby` for correct voiceover -->
				<label
					id="service-label-1"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer focus:ring-1"
				>
					<input
						type="checkbox"
						name="service"
						id="service-1"
						value="development"
						aria-labelledby="service-label-1"
						checked={data?.service?.includes('development') || false}
						bind:group={selectedServices}
						class=""
					/>
					Website Development
				</label>
				<label
					id="service-label-2"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					<input
						type="checkbox"
						name="service"
						id="service-2"
						value="design"
						aria-labelledby="service-label-2"
						checked={data?.service?.includes('design') || false}
						bind:group={selectedServices}
						class=""
					/>
					Website Design
				</label>
				<label
					id="service-label-3"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					<input
						type="checkbox"
						name="service"
						id="service-3"
						value="maintenance"
						aria-labelledby="service-label-3"
						checked={data?.service?.includes('maintenance') || false}
						bind:group={selectedServices}
						class=""
					/>
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
			<div class="flex w-full flex-wrap gap-4">
				<label
					for="1500"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					<input
						type="radio"
						name="budget"
						id="1500"
						value="500-1.5k"
						checked={data?.budget === '500-1.5k' || false}
						bind:group={selectedBudget}
						class=""
					/>
					€ 500 - 1.5k
				</label>

				<label
					for="3000"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					<input
						type="radio"
						name="budget"
						id="3000"
						value="1.5k-3k"
						checked={data?.budget === '1.5k-3k' || false}
						bind:group={selectedBudget}
						class=""
					/>
					€ 1.5k - 3k
				</label>

				<label
					for="5000"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					<input
						type="radio"
						name="budget"
						id="5000"
						value="3k-5k"
						checked={data?.budget === '3k-5k' || false}
						bind:group={selectedBudget}
						class=""
					/>
					€ 3k - 5k
				</label>

				<label
					for="10000"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					<input
						type="radio"
						name="budget"
						id="10000"
						value="5k-10k"
						checked={data?.budget === '5k-10k' || false}
						bind:group={selectedBudget}
						class=""
					/>
					€ 5k - 10k
				</label>

				<label
					for="max"
					class="focus-within:border-[--pink] text-base sm:text-2xl whitespace-nowrap border-2 border-slate-500 rounded-full py-2 px-4 cursor-pointer"
				>
					<input
						type="radio"
						name="budget"
						id="max"
						value="10k+"
						checked={data?.budget === '10k+' || false}
						bind:group={selectedBudget}
						class=""
					/>
					€ 10k+
				</label>
			</div>
			{#if form?.errors?.budget}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.budget}</span>
			{/if}
		</fieldset>

		<div class="w-full mb-8 items-baseline">
			<div class=" whitespace-nowrap mb-4 inline-block text-[--pink]">You can reach me at:</div>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Type your contact email*"
				value={data?.email || ''}
				required
				class=" w-full h-full bg-inherit border-b border-b-slate-500 focus:border-none focus:outline-none focus:rounded-md focus:ring focus:ring-inset focus:ring-[--pink] focus:p-2"
			/>
			{#if form?.errors?.email}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.email}</span>
			{/if}
		</div>

		<div class="w-full mb-8 items-baseline">
			<div class="whitespace-nowrap mr-4 mb-6 inline-block text-[--pink]">Here is brief info:</div>
			<textarea
				name="message"
				id="message"
				placeholder="Type your request* "
				value={form?.errors ? data?.message : ''}
				required
				class="resize-none w-full bg-inherit border-b border-b-slate-500 pb-4 focus:border-none focus:outline-none focus:rounded-md focus:ring focus:ring-inset focus:ring-[--pink] focus:p-2"
			/>
			{#if form?.errors?.message}
				<span class="text-sm font-normal bg-rose-500 p-2">{form?.errors?.message}</span>
			{/if}
		</div>

		<div>
			<button type="submit">Send</button>
		</div>
	</form>
</div>

<style>
</style>
