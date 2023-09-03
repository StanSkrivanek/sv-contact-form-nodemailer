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

			// if valid then
			// email html template
			const html = `
			<div style="font-size: 1.2rem;">
				<p>Hi, my name is <b style="color: blue">${contactEmailData.name}</b> and I'm requesting these services</p>
				<p style="font-size: 2rem;"><b>Service:</b></p>
				<p style="color: blue; line-height: 1.2rem;">${contactEmailData.service}</p>
				<p style="font-size: 2rem;"><b>My budget is</b></p>
				<p style="color: blue; line-height: 1.2rem; "> ${contactEmailData.budget}</p>
				<p style="font-size: 2rem;"><b>Request message:</b></p>
				<p >${contactEmailData.message}</p>
				<p >You can contact me on ${contactEmailData.email}</p>
			</div>
			`;

			// email message setup
			const emailMessage = {
				from: `"${contactEmailData.name}" <${contactEmailData.email}>`,
				to: GOOGLE_EMAIL,
				subject: `New message from Profile website`,
				html
				// text: `Name: ${contactEmailData.name}\nEmail: ${contactEmailData.email}\nService: ${contactEmailData.service}\nBudget: ${contactEmailData.budget}\nMessage: ${contactEmailData.message}`
			};
			// @ts-ignore
			const sendEmail = async (emailMessage) => {
				await new Promise((resolve, reject) => {
					transporter.sendMail(emailMessage, (err, info) => {
						if (err) {
							console.log('transporter ERR', err);
							reject(err);
						} else {
							console.log('transporter messageId', info.messageId);
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
			// if data pass zod validation -> return success
			success: true

		};
	}
};
