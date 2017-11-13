import { DCSerializable, DCSerializableData } from "./DCSerializable";
export interface OptionSetData extends DCSerializableData {
    options: {
        [key: string]: string;
    };
}
export declare class OptionSet extends DCSerializable {
    options: {
        [key: string]: string;
    };
    static tableStr: string;
    tableLabel: string;
    constructor(_id: string, data?: OptionSetData);
}
