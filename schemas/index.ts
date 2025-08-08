import * as z from "zod";
import { UserRole } from "@prisma/client";
export const UserLoginSchema = z.object({
  //   id: z.optional(z.string()),
  password: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().min(1, {
    message: "Name is required",
  }),
  //   username: z
  //     .string()
  //     .min(3, {
  //       message: "minimum 3 characters are required",
  //     })
  //     .trim()
  //     .transform((s, ctx) => {
  //       const withoutWhitespace = s;
  //       if (/\s/.test(s)) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           message: "space is not allowed",
  //         });
  //         //This is a special symbol you can use to return early from the transform function.  It has type `never` so it does not affect the inferred return type.
  //         return z.NEVER;
  //       }
  //       return withoutWhitespace;
  //     }),
  //   role: z.string().min(1, {
  //     message: "role is required",
  //   }),
});
export const UserSchema = z.object({
  id: z.optional(z.string()),
  name: z.optional(
    z.string().min(1, {
      message: "Name is required",
    })
  ),
  email: z.optional(
    z.string().min(1, {
      message: "Email is required",
    })
  ),
  phone: z.optional(
    z.string().min(1, {
      message: "phone is required",
    })
  ),
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
});
export const SettingsOrgUserSchema = z.object({
  fullName: z.optional(z.string()),
  nameWithInitials: z.optional(z.string()),
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  middleName: z.optional(z.string()),
  gender: z.optional(z.string()),

  image: z.optional(z.string()),
  name: z.optional(z.string()),
  nic: z.optional(z.string()),
  nationality: z.optional(z.string()),
  religion: z.optional(z.string()),
  maritalStatus: z.optional(z.string()),
  dob: z.optional(
    z.date({
      // required_error: "A date of birth is required.",
    })
  ),
  createdAt: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
});
export const SettingsSchema = z
  .object({
    passport: z.optional(z.string()),
    fullName: z.optional(z.string()),
    nameWithInitials: z.optional(z.string()),
    description: z.optional(z.string()),
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    middleName: z.optional(z.string()),
    gender: z.optional(z.string()),
    emailVerified: z.optional(
      z.date({
        // required_error: "A date of birth is required.",
      })
    ),
    image: z.optional(z.string()),
    name: z.optional(z.string()),
    nic: z.optional(z.string()),
    nationality: z.optional(z.string()),
    religion: z.optional(z.string()),
    maritalStatus: z.optional(z.string()),
    dob: z.optional(
      z.date({
        // required_error: "A date of birth is required.",
      })
    ),
    createdAt: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
export const RegisterOrgUserSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),

  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const OrgCreateSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),

  description: z.string().min(1, {
    message: "This field is required",
  }),
});

export const QuizCreateSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),

  atNo: z.optional(z.string()),
  anTime: z.optional(z.string()),

  tag: z.optional(z.string()),
  subTag: z.optional(z.string()),

  description: z.optional(z.string()),

  id: z.optional(z.string()),
  country: z.optional(z.string()),
  examination: z.optional(z.string()),
  grade: z.optional(z.string()),
  year: z.optional(z.string()),
  medium: z.optional(z.string()),
  slug: z.optional(z.string()),
  section: z.optional(z.string()),
  type: z.optional(z.string()),
  category: z.optional(z.string()),
  keywords: z.optional(z.string()),
  status: z.optional(z.string()),
  subCategory: z.optional(z.string()),
});

export const LanguagesSchema = z.object({
  name: z.string().min(1, {
    message: "Minimum of 6 characters required",
  }),

  description: z.string().min(1, {
    message: "Minimum of 6 characters required",
  }),
  user_id: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
});

export const TodosDelSchema = z.object({
  inputId: z.string().min(1, {
    message: " required field",
  }),
});
export const TodosSchema = z.object({
  input: z.string().min(1, {
    message: " required field",
  }),

  mark: z.string().min(1, {
    message: " required field",
  }),
});

export const UserPoolSchema = z.object({
  userId: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  poolId: z.string().min(1, {
    message: "This field is required",
  }),
  note: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
});

export const PoolSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),

  note: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
});

export const TodosEdit1Schema = z.object({
  inputId: z.string().min(1, {
    message: "required",
  }),
  newTitle: z.string().min(1, {
    message: "required",
  }),
});
export const TodosEdit2Schema = z.object({
  inputId: z.string().min(1, {
    message: " required field",
  }),
  newTitle: z.string().min(1, {
    message: " required field",
  }),
});
export const TodosEdit3Schema = z.object({
  inputId: z.string().min(1, {
    message: " required field",
  }),
  newTitle: z.string().min(1, {
    message: " required field",
  }),
});

export const AddressSchema = z.object({
  name: z.optional(
    z.string().min(1, {
      message: "Name is required",
    })
  ),

  addressLine1: z.string().min(1, {
    message: "This field is required",
  }),
  addressLine2: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  city: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  stateOrProvince: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  postalCode: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  country: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  telephone: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  fax: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  vatNo: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
});

export const CourseSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  institute: z.string().min(1, {
    message: "required",
  }),
  section: z.optional(z.string()),
  indexNo: z.optional(z.string()),
  year: z.optional(z.string()),
  years: z.optional(z.string()),
  medium: z.optional(z.string()),

  rank: z.optional(z.string()),
  gpa: z.optional(z.string()),
  percentage: z.optional(z.string()),
  creadits: z.optional(z.string()),

  note: z.optional(z.string()),
  status: z.optional(z.string()),
});
export const LanguagesProficiencySchema = z.object({
  title: z.string().min(1, {
    message: "Name is required",
  }),

  score: z.optional(z.string()),
  content: z.optional(z.string()),
  reading: z.optional(z.string()),
  spoken: z.optional(z.string()),
  writing: z.optional(z.string()),
  listening: z.optional(z.string()),
  institute: z.optional(z.string()),

  lastValidDate: z.optional(z.date()),
});
export const SocialMediaSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),

  link: z.string().url().min(1, {
    message: " This field is required",
  }),

  username: z.optional(z.string()),

  nickname: z.optional(z.string()),

  desc: z.optional(z.string()),
});
export const WorkExperienceSchema = z.object({
  description: z.optional(z.string()),
  startDate: z.optional(
    z.date({
      // required_error: "A date of birth is required.",
    })
  ),
  endDate: z.optional(
    z.date({
      // required_error: "A date of birth is required.",
    })
  ),
  country: z.string().min(1, {
    message: " required",
  }),
  position: z.string().min(1, {
    message: " required",
  }),
  place: z.string().min(1, {
    message: " required",
  }),
  city: z.string().min(1, {
    message: " required",
  }),
  status: z.string().min(1, {
    message: " required",
  }),
});
export const ContactNumbersSchema = z.object({
  number: z.string().min(1, {
    message: "Name is required",
  }),
  // countryCode: z.optional(z.string().min(1, {
  //   message: "This field is required",
  // })),
  isWhatsapp: z.optional(z.boolean()),
  isTelegram: z.optional(z.boolean()),
  isImo: z.optional(z.boolean()),
});
export const ExpensesSchema = z.object({
  description: z.string().min(1, {
    message: "This field is required",
  }),

  amount: z.string().min(1, {
    message: "This field is required",
  }),
  category: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
  tag: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),
});

export const AttendanceSchema = z.object({
  inOutAt: z.optional(
    z.date({
      // required_error: " required.",
    })
  ),
});
export const QuizzesSectionSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),
  description: z.optional(
    z.string().min(1, {
      message: "This field is required",
    })
  ),

  type: z.string().min(1, {
    message: "This field is required",
  }),
});
export const QuestionSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),
  tag: z.optional(z.string()),
  subTag: z.optional(z.string()),

  anTime: z.optional(z.string()),
});
export const SkillSchema = z.object({
  skill: z.optional(z.string()),
  points: z.optional(z.string()),
});

export const CategorySchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  slug: z.optional(z.string()),
});
