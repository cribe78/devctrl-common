import { DCSerializable, DCSerializableData, IDCFieldDefinition } from "./DCSerializable";
export interface EndpointTypeData extends DCSerializableData {
    communicatorClass: string;
}
export declare class EndpointType extends DCSerializable {
    communicatorClass: string;
    static tableStr: string;
    tableLabel: string;
    ownFields: IDCFieldDefinition[];
    constructor(_id: string, data?: EndpointTypeData);
}
