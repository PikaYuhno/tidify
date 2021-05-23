import {DocsCommentAttributes} from "./DocsComment";

export interface DocumentAttributes {
    id: number;
    name: string;
    filename: string;

    readonly comments?: DocsCommentAttributes[];
}
