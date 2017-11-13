import { DCSerializable, DCSerializableData, IDCFieldDefinition } from "./DCSerializable";
export declare type UpdateType = "device" | "user" | "watcher";
export declare type UpdateStatus = "requested" | "executed" | "observed";
export interface ControlUpdateData extends DCSerializableData {
    control_id: string;
    value: any;
    type: UpdateType;
    status: UpdateStatus;
    source: string;
    ephemeral?: boolean;
}
export declare class ControlUpdate extends DCSerializable {
    control_id: string;
    value: any;
    type: UpdateType;
    status: UpdateStatus;
    source: string;
    static tableStr: string;
    tableLabel: string;
    ownFields: IDCFieldDefinition[];
    constructor(_id: string, data?: ControlUpdateData);
    getDataObject(): ControlUpdateData;
}
