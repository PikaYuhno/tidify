import {Request, Response, Router} from 'express';
import Message from '../../db/models/Message';
import Channel from '../../db/models/Channel';
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
        }]
    });
})

/**
 * Create a new Message
 * @route {POST} /api/v1/channels/:channelId/messages
 * @routeparam {number} :channelId is a unique id for channels.
 * @bodyparam message object that is defined in the schemas section.
 */
router.post("/:channelId/messages", async (req: Request, res: Response) => {
});

/**
 * Update a Message
 * @route {PUT} /api/v1/channels/:channelId/messages/:messageId
 * @routeparam {number} :channelId is a unique id for channels.
 * @routeparam {number} :messageId is a unique id for messages.
 * @bodyparam message object that is defined in the schemas section.
 */
router.put("/:channelId/messages/:messageId", async (req: Request, res: Response) => {
});

/**
 * Delete a Message
 * @route {DELETE} /api/v1/channels/:channelId/messages/:messageId
 * @routeparam {number} :channelId is a unique id for channels.
 * @routeparam {number} :messageId is a unique id for messages.
 */
router.delete("/:channelId/messages/:messageId", async (req: Request, res: Response) => {
});
