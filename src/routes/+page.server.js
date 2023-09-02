import { GOOGLE_EMAIL } from '$env/static/private';
import transporter from '$lib/mailer/emailSetup.server';
import { contactEmailSchema } from '$lib/types';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const contactEmailData = {
			name: formData.get('name'),
			email: formData.get('email'),
			service: formData.getAll('service'),
			budget: formData.get('budget'),
			message: formData.get('message')
		};
		try {
			// try validate data
			contactEmailSchema.parse(contactEmailData);

			// if valid send email
			const emailMessage = {
				from: `"${contactEmailData.name}" <${contactEmailData.email}>`,
				to: GOOGLE_EMAIL,
				subject: `New message from ${contactEmailData.name}`,
				text: `Name: ${contactEmailData.name}\nEmail: ${contactEmailData.email}\nService: ${contactEmailData.service}\nBudget: ${contactEmailData.budget}\nMessage: ${contactEmailData.message}`
			};
			// @ts-ignore
			const sendEmail = async (emailMessage) => {
				await new Promise((resolve, reject) => {
					transporter.sendMail(emailMessage, (err, info) => {
						if (err) {
							console.log(err);
							reject(err);
						} else {
							console.log(info);
							resolve(info);
						}
					});
				});
			};
			await sendEmail(emailMessage);
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
			success: true
			// after successful submission I'm getting error
			// Unhandled Promise Rejection: TypeError: undefined is not an object (evaluating 'ctx[0]?.data.name')
			// prevent [ctx].data from being undefined
			// Is there any other way than do this?
			// data: { ...contactEmailData }
		};
	}
};
