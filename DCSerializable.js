"use strict";
/**
 * The abstract DCSerializable class represents the basic unit of data interchange for the application.
 * DCSerializable objects correspond to MongoDB documents in the database.  Subtypes of the abstract class
 * correspond to collections in the database, and the application schema is defined in the subtype definitions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var DCFieldType;
(function (DCFieldType) {
    DCFieldType["string"] = "string";
    DCFieldType["int"] = "int";
    DCFieldType["bool"] = "bool";
    DCFieldType["selectStatic"] = "select-static";
    DCFieldType["fk"] = "fk";
    DCFieldType["object"] = "object";
    DCFieldType["watcherActionValue"] = "watcher-action-value";
    DCFieldType["any"] = "any";
})(DCFieldType = exports.DCFieldType || (exports.DCFieldType = {}));
var DCSerializable = (function () {
    function DCSerializable(_id) {
        this._id = _id;
        this.tableLabel = "Table";
        this.foreignKeys = [];
        this.fieldDefinitions = [{
                name: "name",
                type: DCFieldType.string,
                label: "Name",
                tooltip: "The Name of this object"
            }];
        this.dataLoaded = false;
        this.foreignKeys = [];
        this.referenced = {};
    }
    ;
    Object.defineProperty(DCSerializable.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DCSerializable.prototype, "name", {
        get: function () {
            if (typeof this._name !== 'undefined') {
                return this._name;
            }
            return "unknown " + this.table;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    DCSerializable.prototype.addReference = function (refObj) {
        if (!this.referenced[refObj.table]) {
            this.referenced[refObj.table] = {};
        }
        this.referenced[refObj.table][refObj._id] = refObj;
    };
    DCSerializable.defaultDataObject = function (obj) {
        var data = { _id: obj._id, name: obj.name };
        for (var _i = 0, _a = obj.fieldDefinitions; _i < _a.length; _i++) {
            var field = _a[_i];
            if (typeof obj[field.name] !== 'undefined') {
                data[field.name] = obj[field.name];
            }
        }
        return data;
    };
    DCSerializable.prototype.equals = function (obj) {
        return obj && obj._id == this._id;
    };
    DCSerializable.prototype.fkSelectName = function () {
        return this.name;
    };
    DCSerializable.prototype.getDataObject = function () {
        return DCSerializable.defaultDataObject(this);
    };
    ;
    DCSerializable.prototype.itemRequestData = function () {
        return {
            table: this.table,
            params: { _id: this._id }
        };
    };
    DCSerializable.prototype.loadData = function (data) {
        for (var _i = 0, _a = this.fieldDefinitions; _i < _a.length; _i++) {
            var field = _a[_i];
            if (typeof data[field.name] == 'undefined') {
                if (field.optional) {
                    continue;
                }
                throw new Error("Invalid " + this.table + " object, " + field.name + " must be defined for " + this.id);
            }
            this[field.name] = data[field.name];
        }
        this.dataLoaded = true;
    };
    ;
    DCSerializable.prototype.objectPropertyName = function (idProperty) {
        for (var _i = 0, _a = this.foreignKeys; _i < _a.length; _i++) {
            var fkDef = _a[_i];
            if (fkDef.fkIdProp == idProperty) {
                return fkDef.fkObjProp;
            }
        }
        throw new Error("Failed to identify object property associated with " +
            idProperty + " for " + this.table);
    };
    DCSerializable.prototype.removeReference = function (refObj) {
        if (this.referenced[refObj.table] && this.referenced[refObj.table][refObj._id]) {
            delete this.referenced[refObj.table][refObj._id];
        }
    };
    DCSerializable.prototype.tableDefinition = function () {
        return {
            name: this.table,
            label: this.tableLabel,
            fields: this.fieldDefinitions,
            foreignKeys: this.foreignKeys
        };
    };
    DCSerializable.typeTableDefinition = function (ctor) {
        var obj = new ctor("0");
        return obj.tableDefinition();
    };
    /**
     * For use as an the ngFor trackBy function
     */
    DCSerializable.trackById = function (idx, obj) {
        return obj._id;
    };
    return DCSerializable;
}());
exports.DCSerializable = DCSerializable;
//# sourceMappingURL=DCSerializable.js.map