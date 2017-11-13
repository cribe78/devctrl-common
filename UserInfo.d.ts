import { DCSerializable, DCSerializableData, IDCFieldDefinition } from "./DCSerializable";
export interface UserInfoData extends DCSerializableData {
    clientType: ClientType;
}
export declare enum ClientType {
    web = "web",
    ncontrol = "ncontrol",
    watcher = "watcher",
}
export declare class UserInfo extends DCSerializable {
    clientType: ClientType;
    static tableStr: string;
    tableLabel: string;
    ownFields: IDCFieldDefinition[];
    constructor(_id: string, data?: UserInfoData);
}
