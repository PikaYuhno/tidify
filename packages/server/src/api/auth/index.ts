import {Request, Response, Router} from 'express';
export const router = Router();
import User from '../../db/models/User';
import bcrypt from 'bcrypt';
import {loginSchema, registerSchema} from '../../schemas/authSchema';
import {sendChangePWEmail, sendVerificationEmail} from '../../utils/sendEmail';
import {genConfirmationCode} from '../../utils/genConfirmationCode';
import redisClient from '../../db/redis';
import {genChangePwURL} from '../../utils/genChangePwURL';

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
        return res.status(400).json({message: e.errors[0], success: false});
    }
    // check if user exists
    const user: User | null = await User.findOne({where: {email: validatedObj.email}});
    if(!user)
        return res.status(400).json({ message: 'User not found!', success: false});

    // check if user is locked
    if (user.locked) 
        return res.status(400).json({message: 'Your account is locked!', success: false});

    // check if user is verified
    if(!user.verified) 
        return res.status(400).json({ message: 'Please verify your account first', success: false});
    // compare password
    const match = await bcrypt.compare(validatedObj.password, user.password);
    if(!match)
        return res.status(400).json({ message: 'Wrong password!', success: false});
    // add session
    req.session.user = {userId: user.id, username: user.username, role: user.role};

    return res.status(200).json({ message: 'Successfully logged in!', success: true})
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
    const newUser = {...validatedObj, password: hash};
    console.log("New User", newUser);
    const createdUser = await User.create(newUser);

    // send confirmation mail
    sendVerificationEmail({to: createdUser.email}, await genConfirmationCode(createdUser.id));

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
 * @route {PUT} /api/v1/auth/confirm/ 
 * @bodyparam {String} code
 */
router.put("/confirm/", async (req: Request, res: Response) => {
    const {code} = req.body;
    if (!code) 
        return res.status(400).json({data: null, message: 'No code provided', success: false});

    const userId = await redisClient.get(code);
    if(!userId)
        return res.status(400).json({data: null, message: 'Invalid or expired code!', success: false});
    await redisClient.del(code);

    const result = await User.update({verified: true}, {where: {id: userId}});
    return res.status(200).json({data: result, message: 'Successfully verified your account!', success: true});
});

/*
 * Route for sending link for changing password
 * @route {POST} /api/v1/auth/reset/password
 * @bodyparam {String} email
 */
router.post("/reset/password/new", async (req: Request, res: Response) => {
    const {email} = req.body;      
    if (!email)
        return res.status(400).json({message: 'Email not provided!', success: false});
    const user: User | null = await User.findOne({where: {email}});
    if(!user) 
        return res.status(400).json({message: 'User not found!', success: false});
    sendChangePWEmail({
        to: user.email
    }, await genChangePwURL(user.id));

    return res.status(200).json({message: 'Successfully sent link for changing password!', success: true});
});

/*
 * Route for verifying token
 * @route {PUT} /api/v1/auth/reset/password/
 * @bodyparam {String} token
 * @bodyparam {String} newPassword
 */
// @todo validated newPassword
router.put("/reset/password/", async (req: Request, res: Response) => {
    const {token} = req.body; 
    const { newPassword } = req.body;    
    const userId = await redisClient.get(token);
    if (!userId) 
        return res.status(400).json({message: 'Link is expired!', success: false});

    const user = await User.findOne({where: {id: userId}});
    if (!user)
        return res.status(400).json({message: 'User not found!', success: false});

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({password: hashedPassword}, {where: {id: userId}});

    return res.status(200).json({message: 'Successfully updated password!', success: true})
});
