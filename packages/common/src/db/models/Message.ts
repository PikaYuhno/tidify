import {ChannelAttributes} from "./Channel";
import {UserAttributes} from "./User";

export interface MessageAttributes {
    id: number;
    authorId: number;
    guildId: number;
    channelId: number;
    content: string;

    readonly user?: {
        username: string;
    };
    readonly channel?: ChannelAttributes;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
