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
		return {
			// if data pass zod validatin -> return success
			success: true,
			// after successful submission I'm getting error
			// Unhandled Promise Rejection: TypeError: undefined is not an object (evaluating 'ctx[0]?.data.name')
			// prevent [ctx].data from being undefined
			// Is there any other way than do this?
			// data: { ...contactEmailData }
		};
	}
};
