import {UserAttributes} from "./User";
import {AnnouncementAttributes} from "./Announcement";
import {ChannelAttributes} from "./Channel";
import {DocumentAttributes} from "./Document";

export interface GuildAttributes {
    id: number;
    name: string;
    ownerId: number;

    readonly channels?: ChannelAttributes[];
    readonly documents?: DocumentAttributes[];
    readonly announcements?: AnnouncementAttributes[];
    readonly users?: UserAttributes[];
}
