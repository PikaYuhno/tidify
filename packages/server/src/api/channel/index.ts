import { Request, Response, Router } from 'express';
import { createMessageSchema } from '@tidify/common';
import * as yup from 'yup';

import Message from '../../db/models/Message';
import Channel from '../../db/models/Channel';
import User from '../../db/models/Channel';

export const router = Router();


/**
 * Get all messages from channel.
 * @route {GET} /api/v1/channels/:channelId/messages
 */
router.get("/:channelId/messages", async (req: Request, res: Response) => {
    const userId = req.session.user!.userId;
    const channelId = req.params.channelId;
    const messages = await Channel.findOne({
        where: { id: channelId },
        include: [{
            model: Message,
            required: true,
            as: 'messages'
        },
        {
            model: User,
            required: true,
            as: 'user',
        }
    ]
    });

    return res.status(200).json({ data: messages, message: 'Successfully fetched all messages!', success: true });
})

/**
 * Create a new Message
 * @route {POST} /api/v1/channels/:channelId/messages
 * @routeparam {number} :channelId is a unique id for channels.
 * @bodyparam message object that is defined in the schemas section.
 */
router.post("/:channelId/messages", async (req: Request, res: Response) => {
    const userId = req.session.user!.userId;
    const channelId = req.params.channelId;

    const channel = await Channel.findOne({
        where: { id: channelId }
    });

    if (!channel)
        return res.status(400).json({ message: 'Channel not found!', success: false });

    let validatedMessage: yup.InferType<typeof createMessageSchema>;
    try {
        validatedMessage = await createMessageSchema.validate(req.body);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.errors[0], success: false});
    }
    
    const createdMessage = await Message.create({ ...validatedMessage, channelId: channel.id, authorId: userId, guildId: channel.guildId})
    
    return res.status(200).json({ data: createdMessage, message: 'Successfully created Message!', success: true});
});

/**
 * Update a Message
 * @route {PUT} /api/v1/channels/:channelId/messages/:messageId
 * @routeparam {number} :channelId is a unique id for channels.
 * @routeparam {number} :messageId is a unique id for messages.
 * @bodyparam message object that is defined in the schemas section.
 */
router.put("/:channelId/messages/:messageId", async (req: Request, res: Response) => {
    const channelId = req.params.channelId;
    const messageId = req.params.messageId;

    const channel = await Channel.findOne({
        where: { id: channelId }
    });
    
    if (!channel)   
        return res.status(400).json({ message: 'Channel not found!', success: false});
    
    
});

/**
 * Delete a Message
 * @route {DELETE} /api/v1/channels/:channelId/messages/:messageId
 * @routeparam {number} :channelId is a unique id for channels.
 * @routeparam {number} :messageId is a unique id for messages.
 */
router.delete("/:channelId/messages/:messageId", async (req: Request, res: Response) => {
});
