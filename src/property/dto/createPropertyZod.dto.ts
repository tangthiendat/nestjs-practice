import z from 'zod';

export const CreatePropertySchema = z.object({
  name: z.string().min(1).max(100, { message: 'Name is too long' }),
  description: z
    .string()
    .min(1)
    .max(500, { message: 'Description is too long' }),
  area: z.number().positive(),
});

export type CreatePropertyZodDto = z.infer<typeof CreatePropertySchema>;
