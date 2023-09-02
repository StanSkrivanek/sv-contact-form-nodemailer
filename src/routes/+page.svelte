<script>
	import ContactForm from '$lib/ContactForm.svelte';
	export let form;
</script>

<ContactForm {form} />

<!-- TODO: revalidate text input on blur? or key Up? -->
<!-- TODO: instal nodemiler to send email directly without 3-d party mailer account-->
