import {Request, Response, Router} from 'express';
export const router = Router();
import User from '../../db/models/User';
import bcrypt from 'bcrypt';
import {loginSchema, registerSchema} from '../../schemas/authSchema';
import {sendVerificationEmail} from '../../utils/sendEmail';
import {genConfirmationURL} from '../../utils/genConfirmationURL';
import redisClient from '../../db/redis';

/*
 * Login route
 * @route {POST} /api/v1/auth/login
 * @bodyparam {String} email
 * @bodyparam {String} password
 */
router.post("/login", async (req: Request, res: Response) => {
    const body = req.body;
    // validate user input
    let validatedObj = null;
    try {
        validatedObj = await loginSchema.validate(body); 
    } catch (e) {
        console.error(e);
        return res.status(400).json({data: null, message: e.errors[0], success: false});
    }
    // check if user exists
    const user: User | null = await User.findOne({where: {email: validatedObj.email}});
    if(!user)
        return res.status(400).json({data: null, message: 'User not found!', success: false});

    // check if user is verified
    if(!user.verified) 
        return res.status(400).json({data: null, message: 'Please verify your account first', success: false});
    // compare password
    const match = await bcrypt.compare(validatedObj.password, user.password);
    if(!match)
        return res.status(400).json({data: null, message: 'Wrong password!', success: false});
    // add session
    req.session.user = {userId: user.id, username: user.username};

    return res.status(200).json({data: null, message: 'Successfully logged in!', success: true})
});

/*
 * Route for registering new users
 * @route {POST} /api/v1/auth/register
 * @bodyparam {User} 
 */
router.post("/register", async (req: Request, res: Response) => {
    const body = req.body;
    // validate user input
    let validatedObj = null;
    try {
        validatedObj = await registerSchema.validate(body);
    } catch(e) {
        console.error(e);
        return res.status(400).json({data: null, message: e.errors[0], success: false})
    }
    // check if user already exists
    const user: User | null = await User.findOne({where: {email: validatedObj.email}});
    if(user)
        return res.status(400).json({data: null, message: 'User already exists!', success: false});
    // hash password
    const hash = await bcrypt.hash(validatedObj.password, 10);
    // create user
    let newUser = {...validatedObj, password: hash};
    console.log("New User", newUser);
    const createdUser = await User.create(newUser);

    // send confirmation mail
    sendVerificationEmail({to: createdUser.email}, await genConfirmationURL(createdUser.id));

    return res.status(200).json({data: createdUser, message: 'Successfully registered user!', success: true});
});


/*
 * Route for logging out users
 * @route {POST} /api/v1/auth/logout 
 */
router.post("/logout", async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if(err) throw err;
    });
    return res.clearCookie("qid");
});


/*
 * Route for confirming account
 * @route {PUT} /api/v1/auth/confirm/:id 
 */
router.put("/confirm/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    let userId = await redisClient.get(id);
    if(!userId)
        return res.status(400).json({data: null, message: 'Invalid or expired token!', success: false});
    await redisClient.del(id);

    const result = await User.update({verified: true}, {where: {id: userId}});
    return res.status(200).json({data: result, message: 'Successfully verified your account!', success: true});
});


