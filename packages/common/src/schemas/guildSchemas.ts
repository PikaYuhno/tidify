import * as yup from 'yup';

export const createGuildSchema = yup.object().shape({
    name: yup.string().required() 
});
