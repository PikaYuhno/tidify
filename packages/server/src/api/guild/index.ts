import { Router, Request, Response } from 'express';
import Channel from '../../db/models/Channel';
import Guild from '../../db/models/Guild';
export const router = Router();
import { InferType } from 'yup';
import { createBoardSchema, createChannelSchema, createEventSchema } from '@tidify/common'
import redisClient from '../../db/redis';
import User from '../../db/models/User';
import GuildMember from '../../db/models/GuildMember';
import Event from '../../db/models/Event';
import Board from '../../db/models/Board';
import crypto from 'crypto';


/**
 * Get invite info
 * @route {POST} /api/v1/guilds/invites/info
 */
router.post("/invites/info", async (req: Request, res: Response) => {
    const token = req.body.token;

    if (!token)
        return res.status(400).json({ message: 'Token not passed!', success: false });

    // check if token is valid 
    const val = await redisClient.get(token);
    if (!val)
        return res.status(400).json({ message: 'Link is expired!', success: false });
});

/**
 * Accept an invite
 * @route {POST} /api/v1/guilds/:guildId/join
 * @routeparam {number} :guildId is the unique id for guilds.
 * @bodyparam {string} token is the unique token for an invite
 */
router.post("/:guildId/join", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;
    const token = req.body.token;
    const userId = req.session.user!.userId;

    if (!token)
        return res.status(400).json({ message: 'Token not passed!', success: false });

    // check if token is valid 
    const val = await redisClient.get(token);
    if (!val)
        return res.status(400).json({ message: 'Link is expired!', success: false });

    let linkData = JSON.parse(val);

    const guild = await Guild.findOne({
        where: { id: linkData.guildId },
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
    const guildMember = await GuildMember.create({ userId, guildId: parseInt(guildId) });

    return res.status(200).json({ message: `Successfully joined the guild ${guild.name}`, success: true });
});


/**
 * Create invite link
 * @route {POST} /api/v1/guilds/:guildId/invite
 */
router.post("/:guildId/invite", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;
    const userId = req.session.user!.userId;

    const inviteInfos = JSON.stringify({
        guildId,
        userId   
    })

    // create hash & save in redis
    const hash = crypto.randomBytes(20).toString('hex');
    await redisClient.set(hash, userId.toString(), "EX", 60 * 60 * 24);
    // return token with 200 OK
    return res.status(200).json({ message: `${process.env.FRONTEND_HOST}/app?invite=${hash}`, success: true });
});

/**
 * Get all members from a guild
 * @route {GET} /api/v1/guilds/:guildId/members
 */
router.get("/:guildId/members", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;

    const members = await User.findAll({
        include: [{
            where: { id: guildId },
            model: Guild,
            as: 'guilds',
            required: true,
        }],
        attributes: {
            exclude: ['password']
        }
    })
    console.log("Members", members);


    return res.status(200).json({ data: members, message: "Successfully found all members!", success: true });
});
// Channels

/**
 * Get all channels
 * @route {GET} /api/v1/guilds/:guildId/channels
 * @routeparam {number} :guildId is the unique id for guilds.
 */
router.get("/:guildId/channels", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;

    if (!guildId) return res.status(400).json({ message: 'Search parameter not specified!', success: false });

    const channels = await Guild.findOne({
        where: { id: guildId },
        include: [{
            model: Channel,
            required: true,
            as: 'channels'
        }]
    });

    return res.status(200).json({ data: channels, message: 'Successfully found all channels!', sucess: true });
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

    if (!guildId || isNaN(parseInt(guildId))) return res.status(400).json({ message: 'Search parameter not specified or is invalid!', success: false });

    const guild = await Guild.findOne({ where: { id: guildId } });

    if (!guild)
        return res.status(400).json({ message: 'Guild not found!', success: false });

    if (guild.ownerId !== userId)
        return res.status(400).json({ message: 'Only owners can create channels!', success: false });

    let validatedChannel: InferType<typeof createChannelSchema>;
    try {
        validatedChannel = await createChannelSchema.validate(req.body);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: e.errors[0], success: false });
    }

    const channel = { ...validatedChannel, guildId: guild.id };

    const createdChannel = await Channel.create(channel);

    return res.status(200).json({ data: createdChannel, message: 'Successfully found all channels!', sucess: true });
});


// Events
/**
 * Get all events
 * @route {GET} /api/v1/guilds/:guildId/events/
 */
router.get("/:guildId/events", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;

    const events = await Event.findAll({ where: { guildId } });

    return res.status(200).json({ data: events, message: 'Successfully found all events!', success: true });
});

/**
 * Get all events
 * @route {POST} /api/v1/guilds/:guildId/events/
 */
router.post("/:guildId/events", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;

    let validatedEvent: InferType<typeof createEventSchema>;
    try {
        validatedEvent = await createEventSchema.validate(req.body);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: e.errors[0], success: false });
    }

    const createdEvent = await Event.create({ ...validatedEvent, guildId: parseInt(guildId) });

    return res.status(200).json({ data: createdEvent, message: 'Successfully created event!', success: true });
});


// Boards

/**
 * Get all boards
 * @route {GET} /api/v1/guilds/:guildId/boards/
 */
router.get("/:guildId/boards", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;

    const boards = await Board.findAll({ where: { guildId } });

    return res.status(200).json({ data: boards, message: 'Successfully found all boards!', success: true });
});

/**
 * Create a new board
 * @route {POST} /api/v1/guilds/:guildId/boards/
 */
router.post("/:guildId/boards", async (req: Request, res: Response) => {
    const guildId = req.params.guildId;

    let validatedEvent: InferType<typeof createBoardSchema>;
    try {
        validatedEvent = await createBoardSchema.validate(req.body);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: e.errors[0], success: false });
    }

    const createdBoard = await Board.create({ ...validatedEvent, guildId: parseInt(guildId) });

    return res.status(200).json({ data: createdBoard, message: 'Successfully created board!', success: true });
});

/**
 * Update a board
 * @route {PUT} /api/v1/guilds/:guildId/boards/:boardId
 */
router.post("/:guildId/boards/:boardId", async (req: Request, res: Response) => {

});


/**
 * Delete an board
 * @route {PUT} /api/v1/guilds/:guildId/boards/:boardId
 */
router.delete("/:guildId/boards/:bordId", async (req: Request, res: Response) => {
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

    if (!guildId || isNaN(parseInt(guildId))) return res.status(400).json({ message: 'Search parameter not specified or is invalid!', success: false });

    const guild = await Guild.findOne({ where: { id: guildId } });

    if (!guild)
        return res.status(400).json({ message: 'Guild not found!', success: false });

    if (guild.ownerId !== userId)
        return res.status(400).json({ message: 'Only owners can create channels!', success: false });

    await Channel.destroy({ where: { guildId, id: channelId } });

    return res.status(200).json({ message: 'Successfully delete channel!', success: true });
});