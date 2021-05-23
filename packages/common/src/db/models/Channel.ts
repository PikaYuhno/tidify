import { MessageAttributes } from "./Message";

export interface ChannelAttributes {
    id: number;
    name: string;
    guildId: number;
    
    readonly messages?: MessageAttributes[];
}
