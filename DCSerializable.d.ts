/**
 * The abstract DCSerializable class represents the basic unit of data interchange for the application.
 * DCSerializable objects correspond to MongoDB documents in the database.  Subtypes of the abstract class
 * correspond to collections in the database, and the application schema is defined in the subtype definitions.
 */
export interface IDCDataAdd {
    [index: string]: DCSerializableData[];
}
export interface IDCDataDelete {
    table: string;
    _id: string;
}
export interface IDCDataExchange {
    add?: {
        [index: string]: {
            [index: string]: DCSerializableData;
        };
    };
    delete?: IDCDataDelete;
    error?: string;
}
export interface IDCDataRequest {
    table: string;
    params: any;
}
export interface IDCDataUpdate {
    table: string;
    _id: string;
    "set": any;
}
export interface DCSerializableData {
    _id: string;
    name: string;
}
export declare enum DCFieldType {
    string = "string",
    int = "int",
    bool = "bool",
    selectStatic = "select-static",
    fk = "fk",
    object = "object",
    watcherActionValue = "watcher-action-value",
    any = "any",
}
export interface IDCFieldDefinition {
    name: string;
    type: DCFieldType;
    optional?: boolean;
    label: string;
    options?: {
        name: string;
        value: string;
    }[];
    inputDisabled?: boolean;
    tooltip: string;
}
export interface IDCTableDefinition {
    name: string;
    label: string;
    fields: IDCFieldDefinition[];
    foreignKeys: IDCForeignKeyDef[];
}
export interface IDCForeignKeyDef {
    type: any;
    fkObjProp: string;
    fkIdProp: string;
    fkTable: string;
}
export declare abstract class DCSerializable {
    _id: string;
    _name: string;
    dataLoaded: boolean;
    table: string;
    tableLabel: string;
    foreignKeys: IDCForeignKeyDef[];
    referenced: {
        [index: string]: {
            [index: string]: DCSerializable;
        };
    };
    fieldDefinitions: IDCFieldDefinition[];
    constructor(_id: string);
    readonly id: string;
    name: string;
    addReference(refObj: DCSerializable): void;
    static defaultDataObject(obj: DCSerializable): DCSerializableData;
    equals(obj: DCSerializable): boolean;
    fkSelectName(): string;
    getDataObject(): DCSerializableData;
    itemRequestData(): IDCDataRequest;
    loadData(data: DCSerializableData): void;
    objectPropertyName(idProperty: string): string;
    removeReference(refObj: DCSerializable): void;
    tableDefinition(): IDCTableDefinition;
    static typeTableDefinition(ctor: {
        new (id): DCSerializable;
    }): IDCTableDefinition;
    /**
     * For use as an the ngFor trackBy function
     */
    static trackById(idx: number, obj: DCSerializable): string;
}
