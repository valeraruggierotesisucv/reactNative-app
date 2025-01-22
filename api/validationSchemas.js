const { z } = require("zod");

const locationSchema = z.object({
  latitude: z
  .number()
  .refine((val) => !isNaN(parseFloat(val)), "latitude must be a valid number"),
  longitude: z
    .number()
    .refine((val) => !isNaN(parseFloat(val)), "longitude must be a valid number"),
})
const eventSchema = z.object({
    userId: z.string().nonempty("userId is required"),
    eventImage: z.string().url("eventImage must be a valid URL"),
    categoryId: z.number(),
    title: z.string().nonempty("title is required"),
    description: z.string().nonempty("description is required"),
    locationId: z.string().nonempty("locationId is required"), 
    date: z.string().refine((val) => !isNaN(Date.parse(val)), "date must be a valid ISO date"),
    startsAt: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "startsAt must be a valid ISO date"),
    endsAt: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "endsAt must be a valid ISO date"), 
    eventMusic: z.string().url("eventMusic must be a valid URL").optional(),
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
});

const editProfileSchema = z.object({
  fullName: z.string().nonempty("fullName is required"),
  biography: z.string().optional(),
  profileImage: z.string().optional(),
});

const searchUserSchema = z.object({
  search: z.string().nonempty("search is required"),
});

const searchEventSchema = z.object({
  search: z.string().nonempty("search is required"),
});

module.exports = {
  locationSchema, 
  eventSchema,
  likeEventSchema,
  commentEventSchema,
  signUpSchema,
  editProfileSchema,
  searchUserSchema,
  searchEventSchema,
};