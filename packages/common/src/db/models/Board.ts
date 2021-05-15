import {ColumnAttributes} from "./Column";

export interface BoardAttributes {
    id: number;
    title: string;

    readonly columns?: ColumnAttributes[];
}
