import * as yup from 'yup';
export declare const createUserSchema: yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    username: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    firstName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    lastName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    email: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    username: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    firstName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    lastName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    email: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    username: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    firstName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    lastName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    email: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>>;
export declare const updateUserSchema: yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    username: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    firstName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    lastName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    email: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    avatar: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    username: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    firstName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    lastName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    email: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    avatar: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    username: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    firstName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    lastName: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    password: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    email: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    avatar: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>>;
