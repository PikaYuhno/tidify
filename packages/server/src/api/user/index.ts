import { Request, Response, Router } from 'express';
export const router = Router();
import { createUserSchema, updateUserSchema, createGuildSchema } from '@tidify/common';
import * as yup from 'yup';

// import Models
import User from '../../db/models/User';
import Guild from '../../db/models/Guild';

/** 
 * Get all users.
 * @route {GET} /api/v1/users/
 */
router.get("/", async (_: Request, res: Response) => {
    const users = await User.findAll();
    return res.status(200).json({ data: users, message: 'Successfully found all users!', success: true });
});

/**
 * Get one user.
 * @route {GET} /api/v1/users/:userId
 * @routeparam {number} :userId is the unique id for the user. 
 */
router.get("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { id: userId } });

    if (!user)
        return res.status(404).json({ message: 'User not found!', success: false });

    return res.status(200).json({ data: user, message: '', success: true });
});

/**
 * Create a user.
 * @route {POST} /api/v1/users/
 * @bodyaprams a user object that is defined in the schemas section. 
**/
router.post("/", async (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);
    let validatedUser = null;
    try {
        validatedUser = await createUserSchema.validate(user);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ data: null, message: e.errors[0], success: false });
    }

    const createdUser = await User.create(validatedUser);

    return res.status(200).json({ data: createdUser, message: 'Successfully created user!', success: true });
});

/** 
 * Update a user.
 * @route {PUT} /api/v1/users/:userId
 * @routeparam {number} :userId is the unique id for the user. 
 * @bodyaprams a user object that is defined in the schemas section. 
*/
router.put("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = req.body;

    const count = await User.count({ where: { id: userId } });

    if (count === 0)
        return res.status(404).send({ data: null, message: 'User not found!', success: false });

    let validatedUser = null;
    try {
        validatedUser = await updateUserSchema.validate(user);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ data: null, message: e.errors[0], success: false });
    }

    const createdUser = await User.update(validatedUser, { where: { id: userId } });

    return res.status(200).json({ data: createdUser, message: 'Successfully created user!', success: true });
});

/** 
 * Delete a user.
 * @route {DELETE} /api/v1/users/:userId
 * @routeparam {number} :userId is the unique id for the user. 
*/
router.delete("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;

    await User.destroy({ where: { id: userId } });

    return res.status(200).json({ message: 'Successfully deleted user!', success: true })
});


/** 
 * List all guilds
 * @route {GET} /api/v1/users/guilds
*/
router.get("/guilds", async (req: Request, res: Response) => {
    const userId = req.session.user!.userId

    const guilds = await User.findOne({ 
        where: {
            id: userId
        },
        include: [{
            model: Guild,
            required: true,
            as: 'guilds'
        }]
    });

    return res.status(200).json({ data: guilds, message: 'Successfully found all guilds!', success: true});
});

/** 
 * Create a new guild
 * @route {POST} /api/v1/users/guilds
 * @bodyparam guild object that is defined in the schemas section
*/
router.get("/guilds", async (req: Request, res: Response) => {
    const userId = req.session.user!.userId
    
    let validatedGuild: yup.InferType<typeof createGuildSchema> = null;
    
    try {
        validatedGuild = await createGuildSchema.validate(req.body);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: e.errors[0], success: false});
    }
    
    const createdGuild = await Guild.create({ ...validatedGuild, ownerId: userId });

    return res.status(200).json({ data: createdGuild, message: 'Successfully created Guild!', success: true});
});

/** 
 * Get all todos
 * @route {GET} /api/v1/users/todos
*/
router.get("/todos", async (req: Request, res: Response) => {
    
});

/** 
 * Create a new todo
 * @route {POST} /api/v1/users/todos
 * @bodyparam guild object that is defined in the schemas section
*/
router.get("/todos", async (req: Request, res: Response) => {
    
});

/** 
 * Update a todo
 * @route {PUT} /api/v1/users/todos/:todoId
*/
router.get("/todos", async (req: Request, res: Response) => {
    
});

/** 
 * Delete a todo
 * @route {DELETE} /api/v1/users/todos/:todoId
*/
router.get("/todos", async (req: Request, res: Response) => {
    
});