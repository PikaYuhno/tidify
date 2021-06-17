import {Router, Request, Response} from 'express';
import Channel from '../../db/models/Channel';
import Guild from '../../db/models/Guild';
export const router = Router();
import {InferType} from 'yup';
import {createChannelSchema} from '@tidify/common'
import redisClient from '../../db/redis';
import User from '../../db/models/User';
import GuildMember from '../../db/models/GuildMember';


/**
 * Accept an invite
 * @route {POST} /api/v1/guilds/:guildId/join
 * @routeparam {number} :guildId is the unique id for guilds.
 * @bodyparam {string} token is the unique token for an invite
 */
router.get("/:guildId/join", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;
    const token = req.body.token;
    const userId = req.session.user!.userId;

    if (!token)
        return res.status(400).json({ message: 'Token not passed!', success: false });

    // check if token is valid 
    const val = redisClient.get(token);
    if (!val)
        return res.status(400).json({ message: 'Link is expired!', success: false });

    const guild = await Guild.findOne({ 
        where: {id: guildId}, 
        include: [{
            model: User,
            required: true,
            as: 'users',
        }]
    });
    if (!guild)
        return res.status(400).json({ message: 'Guild not found', success: false });

    // check if user already exists in guild
    if (guild.users!.map(u => u.id).includes(userId))
        return res.status(400).json({ message: 'You are already in the guild!', success: false });

    // add user to guild
    const guildMember = await GuildMember.create({userId, guildId: parseInt(guildId) });
    
    return res.status(200).json({ message: `Successfully joined the guild ${guild.name}`, success: true });
});


/**
 * Create invite link
 * @route {POST} /api/v1/guilds/:guildId/invite
 */
router.get("/:guildId/join", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;
    const userId = req.session.user!.userId;

    // create token
    // return token with 200 OK
    return res.status(200).json({ message: "", success: true });
});

// Channels

/**
 * Get all channels
 * @route {GET} /api/v1/guilds/:guildId/channels
 * @routeparam {number} :guildId is the unique id for guilds.
 */
router.get("/:guildId/channels", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;
    
    if (!guildId) return res.status(400).json({ message: 'Search parameter not specified!', success: false});

    const channels = await Guild.findOne({ 
        where: { id: guildId }, 
        include: [{
            model: Channel,
            required: true,
            as: 'channels'
        }]
    }); 

    return res.status(200).json({ data: channels, message: 'Successfully found all channels!', sucess: true});
});

/**
 * Create a new Channel
 * @route {POST} /api/v1/guilds/:guildId/channels
 * @routeparam {number} :guildId is the unique id for guilds.
 * @bodyparams a channel object that is defined in the schemas section.
 */
router.post("/:guildId/channels", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;
    const userId = req.session.user!.userId;

    if (!guildId || isNaN(parseInt(guildId))) return res.status(400).json({ message: 'Search parameter not specified or is invalid!', success: false});

    const guild = await Guild.findOne({where: {id: guildId}});

    if (!guild)
        return res.status(400).json({ message: 'Guild not found!', success: false });

    if (guild.ownerId !== userId) 
        return res.status(400).json({ message: 'Only owners can create channels!', success: false });
    
    let validatedChannel: InferType<typeof createChannelSchema>;
    try {
        validatedChannel = await createChannelSchema.validate(req.body);
    } catch(e) {
        console.error(e);
        return res.status(400).json({ message: e.errors[0], success: false});
    }

    const channel = {...validatedChannel, guildId: guild.id };

    const createdChannel = await Channel.create(channel);
    
    return res.status(200).json({ data: createdChannel, message: 'Successfully found all channels!', sucess: true});
});

/**
 * Delete a channel;
 * @route {DELETE} /api/v1/guilds/:guildId/channels/:channelId
 * @routeparam {number} :guildId is the unique id for guilds.
 * @routeparam {number} :channelId is the unique id for channels.
 */
router.delete("/:guildId/channels/:channelId", async (req: Request, res: Response) => {
    const channelId = req.params.channelId;
    const guildId = req.params.guildId;
    const userId = req.session.user!.userId;

    if (!guildId || isNaN(parseInt(guildId))) return res.status(400).json({ message: 'Search parameter not specified or is invalid!', success: false});

    const guild = await Guild.findOne({where: {id: guildId}});

    if (!guild)
        return res.status(400).json({ message: 'Guild not found!', success: false });

    if (guild.ownerId !== userId) 
        return res.status(400).json({ message: 'Only owners can create channels!', success: false });

    await Channel.destroy({ where: {guildId, id: channelId}});

    return res.status(200).json({message: 'Successfully delete channel!', success: true});
});

// Announcements

/**
 * Get all announcements
 * @route {GET} /api/v1/guilds/:guildId/announcements/
 */
router.get("/:guildId/announcements", async (req: Request, res: Response) => {
    
});

/**
 * Create a new announcement
 * @route {POST} /api/v1/guilds/:guildId/announcements/
 */
router.post("/:guildId/announcements", async (req: Request, res: Response) => {

});

/**
 * Update an announcement
 * @route {PUT} /api/v1/guilds/:guildId/announcements/:announcementId
 */
router.post("/:guildId/announcements/:announcementId", async (req: Request, res: Response) => {

});


/**
 * Delete an announcement
 * @route {PUT} /api/v1/guilds/:guildId/announcements/:announcementId
 */
router.delete("/:guildId/announcements/:announcementId", async (req: Request, res: Response) => {
});

// Boards

/**
 * Get all boards
 * @route {GET} /api/v1/guilds/:guildId/boards/
 */
router.get("/:guildId/boards", async (req: Request, res: Response) => {
    
});

/**
 * Create a new board
 * @route {POST} /api/v1/guilds/:guildId/boards/
 */
router.post("/:guildId/boards", async (req: Request, res: Response) => {

});

/**
 * Update a board
 * @route {PUT} /api/v1/guilds/:guildId/boards/:boardId
 */
router.post("/:guildId/boards/:boardId", async (req: Request, res: Response) => {

});


/**
 * Delete an announcement
 * @route {PUT} /api/v1/guilds/:guildId/boards/:boardId
 */
router.delete("/:guildId/boards/:bordId", async (req: Request, res: Response) => {
});

