import { DCSerializableData, DCSerializable, IDCFieldDefinition } from "./DCSerializable";
import { Room } from "./Room";
export interface PanelData extends DCSerializableData {
    room_id: string;
    grouping: string;
    type: string;
    panel_index: number;
}
export declare class Panel extends DCSerializable {
    private _room;
    room_id: string;
    grouping: string;
    type: string;
    panel_index: number;
    static tableStr: string;
    tableLabel: string;
    table: string;
    foreignKeys: {
        type: typeof Room;
        fkObjProp: string;
        fkIdProp: string;
        fkTable: string;
    }[];
    ownFields: IDCFieldDefinition[];
    constructor(_id: string, data?: PanelData);
    room: Room;
    fkSelectName(): string;
}
