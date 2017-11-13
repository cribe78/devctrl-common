/**
 *
 * The Control is the basic unit of the DevCtrl application.  A Control represents and individual setting or value
 * on a device (Endpoint).  The frontend provides an interface for users to view and change the values of controls.
 */
import { DCSerializableData, DCSerializable, IDCFieldDefinition } from "./DCSerializable";
import { Endpoint } from "./Endpoint";
import { OptionSet } from "./OptionSet";
export interface ControlData extends DCSerializableData {
    endpoint_id: string;
    ctid: string;
    usertype: string;
    control_type: string;
    poll: number;
    config: any;
    value: any;
    option_set_id?: string;
    ephemeral?: boolean;
}
export declare class Control extends DCSerializable {
    endpoint_id: string;
    private _endpoint;
    ctid: string;
    usertype: string;
    control_type: string;
    poll: number;
    config: any;
    private _value;
    ephemeral: boolean;
    option_set_id: string;
    private _option_set;
    foreignKeys: ({
        type: typeof Endpoint;
        fkObjProp: string;
        fkIdProp: string;
        fkTable: string;
    } | {
        type: typeof OptionSet;
        fkObjProp: string;
        fkIdProp: string;
        fkTable: string;
    })[];
    static tableStr: string;
    tableLabel: string;
    static CONTROL_TYPE_BOOLEAN: string;
    static CONTROL_TYPE_ECHO: string;
    static CONTROL_TYPE_INT: string;
    static CONTROL_TYPE_RANGE: string;
    static CONTROL_TYPE_STRING: string;
    static CONTROL_TYPE_XY: string;
    static USERTYPE_BUTTON: string;
    static USERTYPE_BUTTON_SET: string;
    static USERTYPE_CLQL_FADER: string;
    static USERTYPE_HYPERLINK: string;
    static USERTYPE_IMAGE: string;
    static USERTYPE_F32_MULTIBUTTON: string;
    static USERTYPE_SLIDER_2D: string;
    static USERTYPE_SWITCH: string;
    static USERTYPE_SWITCH_READONLY: string;
    static USERTYPE_SLIDER: string;
    static USERTYPE_READONLY: string;
    static USERTYPE_LEVEL: string;
    static USERTYPE_SELECT: string;
    static USERTYPE_SELECT_READONLY: string;
    ownFields: IDCFieldDefinition[];
    constructor(_id: string, data?: ControlData);
    endpoint: Endpoint;
    option_set: OptionSet;
    value: any;
    coerceValue(): void;
    fkSelectName(): string;
    selectOptions(): any;
    selectOptionsArray(): {
        name: any;
        value: string;
    }[];
    selectValueName(val?: any): any;
}
export declare class ControlXYValue {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    toString(): string;
}
