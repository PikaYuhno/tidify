import * as yup from 'yup';

export const createChannelSchema = yup.object().shape({
    name: yup.string().required() 
});
