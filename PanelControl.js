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
var Control_1 = require("./Control");
var Panel_1 = require("./Panel");
var PanelControl = (function (_super) {
    __extends(PanelControl, _super);
    function PanelControl(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.tableLabel = "Panel Controls";
        _this.foreignKeys = [
            {
                type: Control_1.Control,
                fkObjProp: "control",
                fkIdProp: "control_id",
                fkTable: Control_1.Control.tableStr
            },
            {
                type: Panel_1.Panel,
                fkObjProp: "panel",
                fkIdProp: "panel_id",
                fkTable: Panel_1.Panel.tableStr
            }
        ];
        _this.ownFields = [
            {
                name: "control_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Control",
                tooltip: "The Control to be included"
            },
            {
                name: "panel_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Panel",
                tooltip: "The Panel which will include the Control"
            },
            {
                name: "idx",
                type: DCSerializable_1.DCFieldType.int,
                label: "Order",
                optional: true,
                tooltip: "The position of the Control within this Panel"
            }
        ];
        _this.table = PanelControl.tableStr;
        _this.fieldDefinitions = _this.fieldDefinitions.concat(_this.ownFields);
        // Set a custom value for the name tooltip
        if (_this.fieldDefinitions[0].name == "name") {
            _this.fieldDefinitions[0].tooltip = "Name of the Control in this context";
        }
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    Object.defineProperty(PanelControl.prototype, "control", {
        get: function () {
            return this._control;
        },
        set: function (control) {
            this._control = control;
            this.control_id = control._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelControl.prototype, "endpoint", {
        get: function () {
            return this._control.endpoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelControl.prototype, "panel", {
        get: function () {
            return this._panel;
        },
        set: function (panel) {
            this._panel = panel;
            this.panel_id = panel._id;
        },
        enumerable: true,
        configurable: true
    });
    PanelControl.tableStr = "panel_controls";
    return PanelControl;
}(DCSerializable_1.DCSerializable));
exports.PanelControl = PanelControl;
//# sourceMappingURL=PanelControl.js.map