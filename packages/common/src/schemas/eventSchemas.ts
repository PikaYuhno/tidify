import * as yup from 'yup';

export const createEventSchema = yup.object().shape({
    title: yup.string().required() ,
    start: yup.date().required(),
    end: yup.date().required(),
});
