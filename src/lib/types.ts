import * as z from 'zod';
// validate email address
export const contactEmailSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, { message: 'Name must be at least 2 characters' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email address' }),
	service: z.array(z.string()).nonempty({ message: 'Please select at least one service' }),
	budget: z.enum(['500-1.5k', '1.5k-3k', '3k-5k', '5k-10k', '10k+'], {
		errorMap: () => ({ message: 'Please select a budget' })
	}),
	message: z
		.string({ required_error: 'Message is required' })
		.min(10, { message: 'Message must be at least 10 characters' })
		.trim()
});

export type ContactEmail = z.infer<typeof contactEmailSchema>;
