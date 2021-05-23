import {Response, Request } from 'express';

export const requireRoles = (roles: string[]) =>  (req: Request, res: Response, next: any): void | Response => {
    const user = req.session.user!;
    if (!roles.includes(user.role)) {
        return res.status(403);
    }

    next();
}
