import { DCSerializableData, DCSerializable, IDCFieldDefinition } from "./DCSerializable";
import { Control } from "./Control";
import { Panel } from "./Panel";
import { Endpoint } from "./Endpoint";
export interface PanelControlData extends DCSerializableData {
    control_id: string;
    panel_id: string;
    idx: number;
}
export declare class PanelControl extends DCSerializable {
    control_id: string;
    _control: Control;
    panel_id: string;
    _panel: Panel;
    idx: number;
    static tableStr: string;
    tableLabel: string;
    table: string;
    foreignKeys: ({
        type: typeof Control;
        fkObjProp: string;
        fkIdProp: string;
        fkTable: string;
    } | {
        type: typeof Panel;
        fkObjProp: string;
        fkIdProp: string;
        fkTable: string;
    })[];
    ownFields: IDCFieldDefinition[];
    constructor(_id: string, data?: PanelControlData);
    control: Control;
    readonly endpoint: Endpoint;
    panel: Panel;
}
