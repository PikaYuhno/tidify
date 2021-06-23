import {ColumnAttributes} from "./Column";

export interface BoardAttributes {
    id: number;
    title: string;
    guildId: number;

    readonly columns?: ColumnAttributes[];
}
