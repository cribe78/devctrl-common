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
var ActionLog = (function (_super) {
    __extends(ActionLog, _super);
    function ActionLog(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.referenceList = [];
        _this.typeFlags = [];
        _this.table = ActionLog.tableStr;
        _this.ownFields = [
            {
                name: "control_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Control",
                tooltip: "The affected Control"
            },
            {
                name: "client_id",
                type: DCSerializable_1.DCFieldType.string,
                label: "Client",
                tooltip: "The client requesting the action"
            },
            {
                name: "new_value",
                type: DCSerializable_1.DCFieldType.string,
                label: "New Value",
                tooltip: "The new Control value"
            },
            {
                name: "old_value",
                type: DCSerializable_1.DCFieldType.string,
                label: "Old Value",
                tooltip: "The old Control value"
            },
            {
                name: "ts",
                type: DCSerializable_1.DCFieldType.int,
                label: "Timestamp",
                tooltip: "The time of the action"
            }
        ];
        _this.fieldDefinitions = _this.fieldDefinitions.concat(_this.ownFields);
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    ActionLog.prototype.getDataObject = function () {
        return DCSerializable_1.DCSerializable.defaultDataObject(this);
    };
    ActionLog.tableStr = "ActionLogs";
    ActionLog.tableLabel = "Action Logs";
    return ActionLog;
}(DCSerializable_1.DCSerializable));
exports.ActionLog = ActionLog;
//# sourceMappingURL=ActionLog.js.map