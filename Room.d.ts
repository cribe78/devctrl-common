import { DCSerializableData, DCSerializable } from "./DCSerializable";
export interface RoomData extends DCSerializableData {
    name: string;
}
export declare class Room extends DCSerializable {
    static tableStr: string;
    tableLabel: string;
    table: string;
    constructor(_id: string, data?: RoomData);
    getDataObject(): RoomData;
}
