import { DCSerializable, DCSerializableData, IDCFieldDefinition } from "./DCSerializable";
export interface ActionLogData extends DCSerializableData {
    timestamp: number;
    referenceList: string[];
    typeFlags: string[];
    user_session_id: string;
}
export declare class ActionLog extends DCSerializable {
    timestamp: number;
    referenceList: string[];
    typeFlags: string[];
    user_session_id: string;
    static tableStr: string;
    static tableLabel: string;
    table: string;
    ownFields: IDCFieldDefinition[];
    constructor(_id: string, data?: ActionLogData);
    getDataObject(): ActionLogData;
}
