"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DCSerializable_1 = require("./DCSerializable");
var ControlUpdate = (function (_super) {
    __extends(ControlUpdate, _super);
    function ControlUpdate(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.tableLabel = "Control Updates";
        _this.ownFields = [
            {
                name: 'control_id',
                type: DCSerializable_1.DCFieldType.fk,
                label: "Control",
                tooltip: "The updated control"
            },
            {
                name: "value",
                type: DCSerializable_1.DCFieldType.any,
                label: "Value",
                tooltip: "The new control value"
            },
            {
                name: "type",
                type: DCSerializable_1.DCFieldType.string,
                label: "Type",
                tooltip: "source type of update"
            },
            {
                name: "status",
                type: DCSerializable_1.DCFieldType.string,
                label: "Status",
                tooltip: "Status up update"
            },
            {
                name: "source",
                type: DCSerializable_1.DCFieldType.string,
                label: "Source",
                tooltip: "source id of update"
            }
        ];
        _this.table = ControlUpdate.tableStr;
        _this.fieldDefinitions = _this.fieldDefinitions.concat(_this.ownFields);
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    ControlUpdate.prototype.getDataObject = function () {
        return DCSerializable_1.DCSerializable.defaultDataObject(this);
    };
    ControlUpdate.tableStr = "ControlUpdates";
    return ControlUpdate;
}(DCSerializable_1.DCSerializable));
exports.ControlUpdate = ControlUpdate;
//# sourceMappingURL=ControlUpdate.js.map