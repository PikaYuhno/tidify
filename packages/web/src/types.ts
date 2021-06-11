export type UserRegister = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export type UserLogin = {
    email: string;
    password: string;
}

export type ResetPassword = {
    newPassword: string;
    confirmPassword: string;
    token: string;
}

export type Response<T> = {
    data: T;
    message: string;
    success: boolean; 
}