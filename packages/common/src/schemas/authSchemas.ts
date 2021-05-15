import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export const registerSchema = yup.object().shape({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
});
