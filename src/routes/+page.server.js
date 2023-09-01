import { contactEmailSchema } from '$lib/types';
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const contactEmailData = {
			name: formData.get('name') ?? '',
			email: formData.get('email') ?? '',
			service: formData.getAll('service') ?? [],
			budget: formData.get('budget') ?? '',
			message: formData.get('message') ?? ''
		};
		try {
			// try validate data
			contactEmailSchema.parse(contactEmailData);
		} catch (err) {
			// if not valid return errors
			// @ts-ignore
			const { fieldErrors } = err.flatten();
			const { ...rest } = contactEmailData;
			console.log(fieldErrors);
			return {
				errors: fieldErrors,
				data: rest
			};
		}
		// else
		return {
			success: true,
            // prevent [ctx].data from being undefined
            // Is there any other way to do this?
			data: {
				name: '',
				email: '',
				service: [],
				budget: '',
				message: ''
			}
		};
	}
};
