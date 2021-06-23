import * as yup from 'yup';

export const createBoardSchema = yup.object().shape({
    title: yup.string().required() 
});
