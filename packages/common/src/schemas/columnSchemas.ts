import * as yup from 'yup';

export const createColumnSchema = yup.object().shape({
    name: yup.string().required() 
});
