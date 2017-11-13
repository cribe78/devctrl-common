"use strict";
/**
 *
 * The Control is the basic unit of the DevCtrl application.  A Control represents and individual setting or value
 * on a device (Endpoint).  The frontend provides an interface for users to view and change the values of controls.
 */
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
var Endpoint_1 = require("./Endpoint");
var OptionSet_1 = require("./OptionSet");
var Control = (function (_super) {
    __extends(Control, _super);
    function Control(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.config = {};
        _this.ephemeral = false;
        _this.foreignKeys = [
            {
                type: Endpoint_1.Endpoint,
                fkObjProp: "endpoint",
                fkIdProp: "endpoint_id",
                fkTable: Endpoint_1.Endpoint.tableStr
            },
            {
                type: OptionSet_1.OptionSet,
                fkObjProp: "option_set",
                fkIdProp: "option_set_id",
                fkTable: OptionSet_1.OptionSet.tableStr
            }
        ];
        _this.tableLabel = "Controls";
        _this.ownFields = [
            {
                name: "endpoint_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Endpoint",
                tooltip: "The Endpoint this control belongs to"
            },
            {
                name: "ctid",
                type: DCSerializable_1.DCFieldType.string,
                label: "CTID",
                tooltip: "A unique identifier assigned by the NControl communicator"
            },
            {
                name: "usertype",
                type: DCSerializable_1.DCFieldType.selectStatic,
                label: "UI Type",
                options: [
                    { name: "button", value: Control.USERTYPE_BUTTON },
                    { name: "button set", value: Control.USERTYPE_BUTTON_SET },
                    { name: "Hyperlink", value: Control.USERTYPE_HYPERLINK },
                    { name: "Image", value: Control.USERTYPE_IMAGE },
                    { name: "F32 Multibutton", value: Control.USERTYPE_F32_MULTIBUTTON },
                    { name: "Level Meter", value: Control.USERTYPE_LEVEL },
                    { name: "Text (readonly)", value: Control.USERTYPE_READONLY },
                    { name: "Select", value: Control.USERTYPE_SELECT },
                    { name: "Select (readonly)", value: Control.USERTYPE_SELECT_READONLY },
                    { name: "Slider", value: Control.USERTYPE_SLIDER },
                    { name: "2D Slider", value: Control.USERTYPE_SLIDER_2D },
                    { name: "Switch", value: Control.USERTYPE_SWITCH }
                ],
                tooltip: "Determines how this Control is displayed in the UI"
            },
            {
                name: "control_type",
                type: DCSerializable_1.DCFieldType.selectStatic,
                label: "Control Type",
                options: [
                    { name: "boolean", value: Control.CONTROL_TYPE_BOOLEAN },
                    { name: "echo", value: Control.CONTROL_TYPE_ECHO },
                    { name: "int", value: Control.CONTROL_TYPE_INT },
                    { name: "range", value: Control.CONTROL_TYPE_RANGE },
                    { name: "string", value: Control.CONTROL_TYPE_STRING },
                    { name: "xy", value: Control.CONTROL_TYPE_XY }
                ],
                tooltip: "Defined and used by the NControl communicator",
                inputDisabled: true
            },
            {
                name: "poll",
                type: DCSerializable_1.DCFieldType.bool,
                label: "Poll?",
                tooltip: "Should endpoint be periodically queried for value?"
            },
            {
                name: "config",
                type: DCSerializable_1.DCFieldType.object,
                label: "Default Config",
                tooltip: "A collection of Control specific settings"
            },
            {
                name: "option_set_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Option Set",
                optional: true,
                tooltip: "The collection of options to use for a select Control"
            },
            {
                name: "value",
                type: DCSerializable_1.DCFieldType.string,
                label: "Value",
                tooltip: "The current value of this Control"
            },
            {
                name: "ephemeral",
                type: DCSerializable_1.DCFieldType.bool,
                label: "Ephemeral",
                optional: true,
                tooltip: "The Control value will not be stored in the database for ephemeral Controls"
            }
        ];
        _this.table = Control.tableStr;
        _this.referenced = {
            endpoints: {},
            panel_controls: {}
        };
        _this.fieldDefinitions = _this.fieldDefinitions.concat(_this.ownFields);
        if (data) {
            _this.loadData(data);
            _this.coerceValue();
        }
        return _this;
    }
    Object.defineProperty(Control.prototype, "endpoint", {
        get: function () {
            return this._endpoint;
        },
        set: function (endpoint) {
            this._endpoint = endpoint;
            this.endpoint_id = endpoint._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "option_set", {
        get: function () {
            return this._option_set;
        },
        set: function (option_set) {
            this._option_set = option_set;
            this.option_set_id = option_set._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.coerceValue();
        },
        enumerable: true,
        configurable: true
    });
    Control.prototype.coerceValue = function () {
        if (this.control_type == Control.CONTROL_TYPE_STRING && typeof this._value == 'number') {
            this._value = "" + this._value;
        }
    };
    Control.prototype.fkSelectName = function () {
        if (this._endpoint) {
            return this._endpoint.name + ": " + this.name;
        }
        return this.name;
    };
    Control.prototype.selectOptions = function () {
        var options;
        if (this.option_set && this.option_set.options) {
            options = this.option_set.options;
        }
        else {
            options = !!this.config.options ? this.config.options : {};
        }
        return options;
    };
    Control.prototype.selectOptionsArray = function () {
        var options = this.selectOptions();
        var optionsArray = Object.keys(options).map(function (value) {
            return { name: options[value], value: value };
        });
        return optionsArray;
    };
    Control.prototype.selectValueName = function (val) {
        if (val === void 0) { val = null; }
        if (val == null) {
            val = this.value;
        }
        var opts = this.selectOptions();
        var value = '' + val;
        if (opts[value]) {
            return opts[value];
        }
        return value;
    };
    Control.tableStr = "controls";
    // usertype and control_type values
    Control.CONTROL_TYPE_BOOLEAN = "boolean";
    Control.CONTROL_TYPE_ECHO = "echo"; // For echo controls, ncontrol just returns the value specified
    Control.CONTROL_TYPE_INT = "int";
    Control.CONTROL_TYPE_RANGE = "range";
    Control.CONTROL_TYPE_STRING = "string";
    Control.CONTROL_TYPE_XY = "xy";
    Control.USERTYPE_BUTTON = "button";
    Control.USERTYPE_BUTTON_SET = "button-set";
    Control.USERTYPE_CLQL_FADER = "clql-fader";
    Control.USERTYPE_HYPERLINK = "hyperlink";
    Control.USERTYPE_IMAGE = "image";
    Control.USERTYPE_F32_MULTIBUTTON = "f32-multibutton";
    Control.USERTYPE_SLIDER_2D = "slider2d";
    Control.USERTYPE_SWITCH = "switch";
    Control.USERTYPE_SWITCH_READONLY = "switch-readonly";
    Control.USERTYPE_SLIDER = "slider";
    Control.USERTYPE_READONLY = "readonly";
    Control.USERTYPE_LEVEL = "level";
    Control.USERTYPE_SELECT = "select";
    Control.USERTYPE_SELECT_READONLY = "select-readonly";
    return Control;
}(DCSerializable_1.DCSerializable));
exports.Control = Control;
var ControlXYValue = (function () {
    function ControlXYValue(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    ControlXYValue.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ")";
    };
    return ControlXYValue;
}());
exports.ControlXYValue = ControlXYValue;
//# sourceMappingURL=Control.js.map