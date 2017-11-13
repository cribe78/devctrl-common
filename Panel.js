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
var Room_1 = require("./Room");
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.type = "list";
        _this.panel_index = 1;
        _this.tableLabel = "Panels";
        _this.foreignKeys = [
            {
                type: Room_1.Room,
                fkObjProp: "room",
                fkIdProp: "room_id",
                fkTable: Room_1.Room.tableStr
            }
        ];
        _this.ownFields = [
            {
                name: "room_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Room",
                tooltip: "The Room this Panel appears in"
            },
            {
                name: "grouping",
                type: DCSerializable_1.DCFieldType.string,
                label: "Room Tab",
                tooltip: "The tab that this panel appears on"
            },
            {
                name: "type",
                type: DCSerializable_1.DCFieldType.selectStatic,
                label: "Type",
                options: [
                    { name: "List", value: "list" },
                    { name: "Switch Group", value: "switch-group" },
                    { name: "Horizontal", value: "horizontal" }
                ],
                tooltip: "The type of Panel"
            },
            {
                name: "panel_index",
                type: DCSerializable_1.DCFieldType.int,
                label: "Order",
                tooltip: "Panels within a tab are arranged by order"
            }
        ];
        _this.table = Panel.tableStr;
        _this.referenced = {
            'panel_controls': {}
        };
        _this.fieldDefinitions = _this.fieldDefinitions.concat(_this.ownFields);
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    Object.defineProperty(Panel.prototype, "room", {
        get: function () {
            return this._room;
        },
        set: function (room) {
            this._room = room;
            this.room_id = room._id;
        },
        enumerable: true,
        configurable: true
    });
    Panel.prototype.fkSelectName = function () {
        return this.room.name + ": " + this.grouping + ": " + this.name;
    };
    Panel.tableStr = "panels";
    return Panel;
}(DCSerializable_1.DCSerializable));
exports.Panel = Panel;
//# sourceMappingURL=Panel.js.map