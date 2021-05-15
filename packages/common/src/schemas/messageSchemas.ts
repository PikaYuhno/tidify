import * as yup from 'yup';

export const createMessageSchema = yup.object().shape({
    content: yup.string().required()
});
