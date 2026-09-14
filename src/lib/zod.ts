import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  hotel: z.string().optional(),
  dietary: z.string().optional(),
  plusOne: z.boolean().default(false),
  plusOneDetails: z.string().optional(),
});

// Shape before Zod applies defaults — matches what the form actually holds
// while the user is filling it in (plusOne can be undefined here).
export type RsvpInput = z.input<typeof rsvpSchema>;

// Shape after Zod applies defaults/validation — matches what onSubmit
// receives (plusOne is guaranteed to be a boolean here).
export type RsvpData = z.output<typeof rsvpSchema>;
