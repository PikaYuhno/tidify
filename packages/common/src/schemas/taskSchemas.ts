import * as yup from 'yup';

export const createTaskSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
});
