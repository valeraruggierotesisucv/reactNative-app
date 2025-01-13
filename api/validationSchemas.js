const { z } = require("zod");

const eventSchema = z.object({
    userId: z.string().nonempty("userId is required"),
    eventImage: z.string().url("eventImage must be a valid URL"),
    categoryId: z.string().nonempty("categoryId is required"),
    latitude: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "latitude must be a valid number"),
    longitude: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "longitude must be a valid number"),
    title: z.string().nonempty("title is required"),
    description: z.string().nonempty("description is required"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), "date must be a valid ISO date"),
    startsAt: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "startsAt must be a valid ISO date"),
    endsAt: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "endsAt must be a valid ISO date")
});

const likeEventSchema = z.object({
  userId: z.string().nonempty("userId is required"),
});

const commentEventSchema = z.object({
  userId: z.string().nonempty("userId is required"),
  text: z.string().nonempty("text is required"),
});

const signUpSchema = z.object({
  userId: z.string().nonempty("userId is required"),
  username: z.string().nonempty("username is required"),
  fullName: z.string().nonempty("fullName is required"),
  email: z.string().email("email must be a valid email"),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), "birthDate must be a valid date"),
  language: z.enum(["ENGLISH", "SPANISH"]),
});

module.exports = {
  eventSchema,
  likeEventSchema,
  commentEventSchema,
  signUpSchema,
};