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
var ActionTrigger = (function (_super) {
    __extends(ActionTrigger, _super);
    function ActionTrigger(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.trigger_value = 'any';
        _this.value_test = ActionTrigger.VALUE_TEST_ANY;
        _this.action_control_value = {};
        _this.enabled = false;
        _this.tableLabel = "Action Triggers";
        _this.foreignKeys = [
            {
                type: Control_1.Control,
                fkObjProp: "trigger_control",
                fkIdProp: "trigger_control_id",
                fkTable: Control_1.Control.tableStr
            },
            {
                type: Control_1.Control,
                fkObjProp: "action_control",
                fkIdProp: "action_control_id",
                fkTable: Control_1.Control.tableStr
            }
        ];
        _this.table = ActionTrigger.tableStr;
        _this.fieldDefinitions = _this.fieldDefinitions.concat([
            {
                name: "trigger_control_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Trigger Control",
                tooltip: "The Control which will trigger an action"
            },
            {
                name: "action_control_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Action Control",
                tooltip: "The Control which will be acted upon"
            },
            {
                name: "action_control_value",
                type: DCSerializable_1.DCFieldType.watcherActionValue,
                label: "Action Value",
                tooltip: "The value the Action Control will be set to"
            },
            {
                name: "enabled",
                type: DCSerializable_1.DCFieldType.bool,
                label: "Enabled?",
                tooltip: "Disabling a rule prevents its execution"
            },
            {
                name: "value_test",
                type: DCSerializable_1.DCFieldType.selectStatic,
                label: "Value Test",
                options: [
                    { name: "any", value: "any" },
                    { name: "=", value: "=" },
                    { name: "<", value: "<" },
                    { name: ">", value: ">" }
                ],
                tooltip: "Test the trigger value against a criteria before triggering an action"
            },
            {
                name: "trigger_value",
                type: DCSerializable_1.DCFieldType.string,
                label: "Trigger Value",
                tooltip: "A value of the Trigger Control used in the value test"
            }
        ]);
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    Object.defineProperty(ActionTrigger.prototype, "action_control", {
        get: function () {
            return this._action_control;
        },
        set: function (val) {
            this._action_control = val;
            this.action_control_id = val._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionTrigger.prototype, "trigger_control", {
        get: function () {
            return this._trigger_control;
        },
        set: function (val) {
            this._trigger_control = val;
            this.trigger_control_id = val._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionTrigger.prototype, "name", {
        /**
         * Just assign a name based on controls
         */
        get: function () {
            if (this.trigger_control && this.action_control) {
                return this.trigger_control.fkSelectName() + " - " + this.action_control.fkSelectName();
            }
            return 'ActionTrigger ' + this._id;
        },
        set: function (value) {
            // Haha! you can't do that!
        },
        enumerable: true,
        configurable: true
    });
    ActionTrigger.prototype.getDataObject = function () {
        return DCSerializable_1.DCSerializable.defaultDataObject(this);
    };
    ActionTrigger.prototype.generateControlUpdate = function (update, guid, checkStatus) {
        if (checkStatus === void 0) { checkStatus = true; }
        if (checkStatus && update.status != 'observed') {
            return "statusCheck failed, status: " + update.status;
        }
        if (update.control_id != this.trigger_control_id) {
            return "control_id check failed";
        }
        // Perform value test
        if (this.value_test == ActionTrigger.VALUE_TEST_EQUALS) {
            if (update.value != this.trigger_value) {
                return "value test equals failed, " + update.value + " != " + this.trigger_value;
            }
        }
        else if (this.value_test == ActionTrigger.VALUE_TEST_GREATER_THAN) {
            if (!(parseFloat(update.value) > parseFloat(this.trigger_value))) {
                return "value test gt failed, " + update.value + " <= " + this.trigger_value;
            }
        }
        else if (this.value_test == ActionTrigger.VALUE_TEST_LESS_THAN) {
            if (!(parseFloat(update.value) < parseFloat(this.trigger_value))) {
                return "value test lt failed, " + update.value + " >= " + this.trigger_value;
            }
        }
        else if (this.value_test == ActionTrigger.VALUE_TEST_ANY) { }
        else {
            return "unknown value test type " + this.value_test;
        }
        // Determine resultant update value
        var outputValue;
        if (typeof this.action_control_value.value !== 'undefined') {
            outputValue = this.action_control_value.value;
        }
        else if (this.action_control_value.map) {
            outputValue = this.action_control_value.map[update.value];
        }
        if (typeof outputValue === 'undefined') {
            return "failed to determine output value from update value " + update.value;
        }
        var outputUpdateData = {
            _id: guid,
            name: "watcher " + this._id + " update",
            control_id: this.action_control_id,
            value: outputValue,
            type: "watcher",
            status: "requested",
            source: "watcher",
            ephemeral: false
        };
        return outputUpdateData;
    };
    Object.defineProperty(ActionTrigger.prototype, "valueDescription", {
        get: function () {
            var _this = this;
            if (typeof this.action_control_value.value !== 'undefined') {
                return this.action_control_value.value;
            }
            else if (this.action_control_value.map) {
                var map_1 = this.action_control_value.map;
                var valStr = Object.keys(map_1)
                    .map(function (key) {
                    return _this.trigger_control.selectValueName(key) + " => " + _this.action_control.selectValueName(map_1[key]);
                })
                    .join(", ");
                return valStr;
            }
            return 'unknown value';
        },
        enumerable: true,
        configurable: true
    });
    ActionTrigger.tableStr = "watcher_rules";
    ActionTrigger.VALUE_TEST_EQUALS = "=";
    ActionTrigger.VALUE_TEST_LESS_THAN = "<";
    ActionTrigger.VALUE_TEST_GREATER_THAN = ">";
    ActionTrigger.VALUE_TEST_ANY = "any";
    return ActionTrigger;
}(DCSerializable_1.DCSerializable));
exports.ActionTrigger = ActionTrigger;
//# sourceMappingURL=ActionTrigger.js.map