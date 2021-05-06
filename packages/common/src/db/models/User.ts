import {AnnouncementAttributes} from './Announcement';
import {DocsCommentAttributes} from './DocsComment';
import {GuildAttributes} from './Guild';
import {MessageAttributes} from './Message';
import {NoteAttributes} from './Note';
import {TaskAttributes} from './Task';

export interface UserAttributes {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    avatar: string;
    role: string;
    locked: boolean;
    verified: boolean;
    
    readonly messages?: MessageAttributes[];
    readonly comments?: DocsCommentAttributes[];
    readonly notes?: NoteAttributes[];
    readonly announcements?: AnnouncementAttributes[];
    readonly guilds?: GuildAttributes[];
    readonly tasks?: TaskAttributes[];
}
