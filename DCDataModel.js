"use strict";
/*
DCDataModel

The data model shared by the various DevCtrl components

 */
Object.defineProperty(exports, "__esModule", { value: true });
var Panel_1 = require("./Panel");
var PanelControl_1 = require("./PanelControl");
var Room_1 = require("./Room");
var Endpoint_1 = require("./Endpoint");
var EndpointType_1 = require("./EndpointType");
var Control_1 = require("./Control");
var DCSerializable_1 = require("./DCSerializable");
var ActionTrigger_1 = require("./ActionTrigger");
var OptionSet_1 = require("./OptionSet");
var UserInfo_1 = require("./UserInfo");
var DCDataModel = (function () {
    function DCDataModel() {
        this.tables = {};
        this.sortedArrays = {};
        this.typeList = [
            ActionTrigger_1.ActionTrigger,
            Control_1.Control,
            Endpoint_1.Endpoint,
            EndpointType_1.EndpointType,
            OptionSet_1.OptionSet,
            Panel_1.Panel,
            PanelControl_1.PanelControl,
            Room_1.Room,
            UserInfo_1.UserInfo
        ];
        this.types = {};
        this.schema = {};
        this.debug = console.log;
        for (var _i = 0, _a = this.typeList; _i < _a.length; _i++) {
            var type = _a[_i];
            var tschema = DCSerializable_1.DCSerializable.typeTableDefinition(type);
            this.types[tschema.name] = type;
            this.schema[tschema.name] = tschema;
            this.tables[tschema.name] = {};
        }
    }
    ;
    DCDataModel.prototype.loadData = function (data) {
        if (data.add) {
            var add = data.add;
            var addTables = [];
            for (var t in add) {
                addTables.push(t);
            }
            var tableStr = addTables.join(", ");
            this.debug("loadData from " + tableStr);
            // There is some boilerplate here that is necessary to allow typescript
            // to perform its type checking magic.
            for (var t in add) {
                this.loadTableData(add[t], t);
            }
            // Call indexForeignKeys if relevant tables have been updated
            for (var t in this.schema) {
                var tschema = this.schema[t];
                var reindex = false;
                if (add[t]) {
                    reindex = true;
                }
                else {
                    for (var _i = 0, _a = tschema.foreignKeys; _i < _a.length; _i++) {
                        var fkDef = _a[_i];
                        if (add[fkDef.fkTable]) {
                            reindex = true;
                        }
                    }
                }
                if (reindex) {
                    this.indexForeignKeys(this.tables[t]);
                }
            }
            /**
            if (add.endpoints || add.endpoint_types) {
                this.indexForeignKeys(this.endpoints);
            }
            if (add.controls || add.control_templates || add.option_sets) {
                this.indexForeignKeys(this.controls);
            }
            if (add.panels || add.rooms) {
                this.indexForeignKeys(this.panels);
            }
            if (add.controls || add.panels || add.panel_controls) {
                this.indexForeignKeys(this.panel_controls);
            }
            if (add.controls || add.watcher_rules) {
                this.indexForeignKeys(this.watcher_rules);
            }
             **/
        }
        if (data.delete) {
            var del = data.delete;
            var table = del.table;
            var _id = del._id;
            // Remove references from foreign key objects
            if (this.tables[table][_id]) {
                var deleteRec = this.tables[table][_id];
                for (var _b = 0, _c = deleteRec.foreignKeys; _b < _c.length; _b++) {
                    var fkDef = _c[_b];
                    if (deleteRec[fkDef.fkObjProp]) {
                        deleteRec[fkDef.fkObjProp].removeReference(deleteRec);
                    }
                }
                //Delete the object
                delete this.tables[table][_id];
            }
        }
    };
    /**
     *  For data model objects that hold references to other data model objects,
     *  initialize those references
     *
     */
    DCDataModel.prototype.indexForeignKeys = function (objects) {
        for (var id in objects) {
            var obj = objects[id];
            for (var _i = 0, _a = obj.foreignKeys; _i < _a.length; _i++) {
                var fkDef = _a[_i];
                var fkObjs = this.tables[fkDef.fkTable];
                if (obj[fkDef.fkIdProp]) {
                    var fkId = obj[fkDef.fkIdProp]; // The the foreign key id value
                    if (!fkObjs[fkId]) {
                        // Create a new object if necessary
                        fkObjs[fkId] = new fkDef.type(fkId);
                    }
                    // Set reference to "foreign" object
                    obj[fkDef.fkObjProp] = fkObjs[fkId];
                    // Set reference on foreign object
                    fkObjs[fkId].addReference(obj);
                }
            }
        }
    };
    DCDataModel.prototype.loadTableData = function (newData, tableName) {
        var modelData = this.tables[tableName];
        var ctor = this.types[tableName];
        for (var id in newData) {
            if (modelData[id]) {
                modelData[id].loadData(newData[id]);
            }
            else {
                modelData[id] = new ctor(id, newData[id]);
            }
        }
        this.sortArrays(tableName);
    };
    DCDataModel.prototype.getItem = function (id, table) {
        if (this.tables[table][id]) {
            return (this.tables[table][id]);
        }
        this.tables[table][id] = new this.types[table](id);
        return (this.tables[table][id]);
    };
    DCDataModel.prototype.getTableItem = function (id, table) {
        return this.getItem(id, table);
    };
    DCDataModel.prototype.sortArrays = function (table) {
        if (this.sortedArrays[table]) {
            for (var prop in this.sortedArrays[table]) {
                this.sortArray(table, prop);
            }
        }
    };
    DCDataModel.prototype.sortArray = function (table, sortProp) {
        if (this.sortedArrays[table] && this.sortedArrays[table][sortProp]) {
            this.sortedArrays[table][sortProp].length = 0;
            var keys = Object.keys(this.tables[table]);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                this.sortedArrays[table][sortProp].push(this.tables[table][key]);
            }
            this.sortedArrays[table][sortProp].sort(function (a, b) {
                if (a[sortProp] < b[sortProp]) {
                    return -1;
                }
                if (a[sortProp] > b[sortProp]) {
                    return 1;
                }
                return 0;
            });
        }
    };
    /**
     * sortedArray
     *
     * The data model maintains a set of sorted object arrays per request.  Return the
     * specified one
     * @param table
     * @param sortProp
     * @returns DCSerializable[]
     */
    DCDataModel.prototype.sortedArray = function (table, sortProp) {
        if (sortProp === void 0) { sortProp = '_id'; }
        if (!this.sortedArrays[table]) {
            this.sortedArrays[table] = {};
        }
        var sorted = this.sortedArrays[table][sortProp];
        if (sorted) {
            return sorted;
        }
        if (!this.tables[table]) {
            throw new Error("Request for invalid table array");
        }
        this.sortedArrays[table][sortProp] = [];
        this.sortArray(table, sortProp);
        return this.sortedArrays[table][sortProp];
    };
    return DCDataModel;
}());
exports.DCDataModel = DCDataModel;
//# sourceMappingURL=DCDataModel.js.map