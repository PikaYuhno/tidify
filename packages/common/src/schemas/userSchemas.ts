import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
})

export const updateUserSchema = yup.object().shape({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    avatar: yup.string().required()
})
