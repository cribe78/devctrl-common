import { DCSerializableData, DCSerializable } from "./DCSerializable";
import { Control } from "./Control";
import { ControlUpdate, ControlUpdateData } from "./ControlUpdate";
/**
 * A ActionTrigger defines and action in response to a change in a control value
 */
export interface ActionTriggerData extends DCSerializableData {
    trigger_control_id: string;
    trigger_value: any;
    value_test: string;
    action_control_id: string;
    action_control_value: any;
    enabled: boolean;
}
export interface WatcherActionValue {
    value?: string;
    map?: {
        [index: string]: any;
    };
}
export declare class ActionTrigger extends DCSerializable {
    trigger_control_id: string;
    _trigger_control: Control;
    trigger_value: any;
    value_test: string;
    action_control_id: string;
    _action_control: Control;
    action_control_value: WatcherActionValue;
    enabled: boolean;
    static tableStr: string;
    tableLabel: string;
    static VALUE_TEST_EQUALS: string;
    static VALUE_TEST_LESS_THAN: string;
    static VALUE_TEST_GREATER_THAN: string;
    static VALUE_TEST_ANY: string;
    foreignKeys: {
        type: typeof Control;
        fkObjProp: string;
        fkIdProp: string;
        fkTable: string;
    }[];
    constructor(_id: string, data?: ActionTriggerData);
    action_control: Control;
    trigger_control: Control;
    /**
     * Just assign a name based on controls
     */
    name: string;
    getDataObject(): ActionTriggerData;
    generateControlUpdate(update: ControlUpdate, guid: string, checkStatus?: boolean): string | ControlUpdateData;
    readonly valueDescription: string;
}
