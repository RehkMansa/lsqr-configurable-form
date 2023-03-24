import { ZodError, z } from "zod";

const progressActionSchema = z.object({
    type: z.string(),
    label: z.string(),
    message: z.string(),
});

const cancelActionSchema = z.object({
    type: z.literal("cancel"),
    message: z.string(),
    label: z.string(),
    showModal: z.boolean().optional(),
});

const actionTypesSchema = z.tuple([progressActionSchema, cancelActionSchema]);

const inputOnlyFieldsSchema = z.union([
    z.literal("short_text"),
    z.literal("long_text"),
    z.literal("date"),
    z.literal("time"),
    z.literal("date_time"),
    z.literal("integer"),
    z.literal("number"),
    z.literal("phone"),
    z.literal("email"),
    z.literal("label"),
]);

const inputWithDropDownSchema = z.union([
    z.literal("checkbox"),
    z.literal("dropdown"),
    z.literal("radio"),
]);

const uploadTypeInputSchema = z.union([
    z.literal("upload"),
    z.literal("video"),
    z.literal("audio"),
    z.literal("image"),
]);

const optionsSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
});

const dropdownInputsSchema = z.object({
    type: inputWithDropDownSchema,
    options: z.array(optionsSchema),
});

const normalInputsSchema = z.object({
    type: z.union([inputOnlyFieldsSchema, uploadTypeInputSchema]),
});

const fieldsSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        label: z.string(),
        description: z.string(),
        validation: z.record(z.unknown()).optional(),
    })
    .and(z.union([dropdownInputsSchema, normalInputsSchema]));

const sectionSchema = z.object({
    name: z.string(),
    description: z.string(),
    fields: z.array(fieldsSchema),
});

const pagesTypeSchema = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    actions: actionTypesSchema,
    sections: sectionSchema,
});

export const payloadResponseSchema = z.object({
    meta: z.object({
        name: z.string(),
        description: z.string(),
        version: z.string(),
        url: z.string(),
        active: z.union([z.literal("active"), z.literal("inactive")]),
    }),
    pages: z.array(pagesTypeSchema),
});

export const handleZodError = <T>(error: ZodError<T>) => {
    const allErrors: string[] = [];

    error.issues.forEach((err) => {
        console.log(err);

        const message = err.code + " received for " + err.path.join("-");

        allErrors.push(message);
    });

    return { ...error, issues: allErrors.filter(Boolean) };
};
