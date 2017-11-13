import { Room } from "./Room";
import { DCSerializable, DCSerializableData, IDCTableDefinition, IDCDataExchange } from "./DCSerializable";
export interface IndexedDataSet<T> {
    [index: string]: T;
}
export interface IDCSchema {
    [index: string]: IDCTableDefinition;
}
export declare class DCDataModel {
    tables: {
        [index: string]: IndexedDataSet<DCSerializable>;
    };
    /**
    endpoints : IndexedDataSet<Endpoint> = {};
    //endpoint_types : IndexedDataSet<EndpointType> = {};
    //controls : IndexedDataSet<Control> = {};
    panels: IndexedDataSet<Panel> = {};
    panel_controls: IndexedDataSet<PanelControl> = {};
    rooms: IndexedDataSet<Room> = {};
    watcher_rules: IndexedDataSet<ActionTrigger> = {};
    option_sets: IndexedDataSet<OptionSet> = {};
    userInfo : IndexedDataSet<UserInfo> = {};
    **/
    debug: (message: any, ...args: any[]) => void;
    sortedArrays: any;
    typeList: typeof Room[];
    types: {
        [index: string]: {
            new (id, data?): DCSerializable;
        };
    };
    schema: IDCSchema;
    constructor();
    loadData(data: IDCDataExchange): void;
    /**
     *  For data model objects that hold references to other data model objects,
     *  initialize those references
     *
     */
    indexForeignKeys(objects: IndexedDataSet<DCSerializable>): void;
    loadTableData(newData: IndexedDataSet<DCSerializableData>, tableName: string): void;
    getItem(id: string, table: string): DCSerializable;
    getTableItem(id: string, table: string): DCSerializable;
    sortArrays(table: string): void;
    sortArray(table: string, sortProp: string): void;
    /**
     * sortedArray
     *
     * The data model maintains a set of sorted object arrays per request.  Return the
     * specified one
     * @param table
     * @param sortProp
     * @returns DCSerializable[]
     */
    sortedArray(table: string, sortProp?: string): DCSerializable[];
}
