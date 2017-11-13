/**
 * Created by chris on 8/17/16.
 */
import { DCSerializable, DCSerializableData } from "./DCSerializable";
import { EndpointType } from "./EndpointType";
import { Room } from "./Room";
export declare enum EndpointStatus {
    Online = 0,
    Disabled = 1,
    Offline = 2,
    Unknown = 3,
}
export interface EndpointData extends DCSerializableData {
    endpoint_type_id: string;
    status: EndpointStatus;
    ip: string;
    port: number;
    enabled: boolean;
    commLogOptions: string;
}
export declare class Endpoint extends DCSerializable {
    private _type;
    private _room;
    endpoint_type_id: string;
    room_id: string;
    status: EndpointStatus;
    ip: string;
    port: number;
    config: any;
    enabled: boolean;
    private _commLogOptions;
    commLogOptionsObj: {};
    static tableStr: string;
    tableLabel: string;
    foreignKeys: {
        type: typeof Room;
        fkObjProp: string;
        fkIdProp: string;
        fkTable: string;
    }[];
    constructor(_id: string, data?: EndpointData);
    address: string;
    commLogOptions: string;
    room: Room;
    type: EndpointType;
    getControlByCtid(ctid: string): DCSerializable;
    getDataObject(): EndpointData;
}
