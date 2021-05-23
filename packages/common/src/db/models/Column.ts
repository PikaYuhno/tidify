import {TaskAttributes} from "./Task";

export interface ColumnAttributes {
    id: number;
    name: string;
    amount: number;
    order: number;
    boardId: number;

    readonly tasks?: TaskAttributes[];
}
