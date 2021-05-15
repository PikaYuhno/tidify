import {Response, Request } from 'express';

export const verifySession = (req: Request, res: Response, next: any): void | Response => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({data: null, message: 'Please log in!', success: false})
    }

    next();
}
