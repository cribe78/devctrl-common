"use strict";
/**
 * Created by chris on 8/17/16.
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
var EndpointType_1 = require("./EndpointType");
var Room_1 = require("./Room");
var EndpointStatus;
(function (EndpointStatus) {
    EndpointStatus[EndpointStatus["Online"] = 0] = "Online";
    EndpointStatus[EndpointStatus["Disabled"] = 1] = "Disabled";
    EndpointStatus[EndpointStatus["Offline"] = 2] = "Offline";
    EndpointStatus[EndpointStatus["Unknown"] = 3] = "Unknown";
})(EndpointStatus = exports.EndpointStatus || (exports.EndpointStatus = {}));
var Endpoint = (function (_super) {
    __extends(Endpoint, _super);
    function Endpoint(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.status = EndpointStatus.Offline;
        _this.ip = "";
        _this.port = 0;
        _this.config = {};
        _this.enabled = false;
        _this._commLogOptions = "default";
        _this.tableLabel = "Endpoints";
        _this.foreignKeys = [
            {
                type: EndpointType_1.EndpointType,
                fkObjProp: "type",
                fkIdProp: "endpoint_type_id",
                fkTable: EndpointType_1.EndpointType.tableStr
            },
            {
                type: Room_1.Room,
                fkObjProp: "room",
                fkIdProp: "room_id",
                fkTable: Room_1.Room.tableStr
            }
        ];
        _this.table = Endpoint.tableStr;
        _this.referenced = {
            'controls': {}
        };
        _this.fieldDefinitions = _this.fieldDefinitions.concat([
            {
                name: "endpoint_type_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Endpoint Type",
                tooltip: "Determines the control protocol used for device communication"
            },
            {
                name: "ip",
                type: DCSerializable_1.DCFieldType.string,
                label: "Address",
                tooltip: "The IP or device address"
            },
            {
                name: "port",
                type: DCSerializable_1.DCFieldType.int,
                label: "Port",
                tooltip: "The TCP port number for a networked device"
            },
            {
                name: "config",
                type: DCSerializable_1.DCFieldType.object,
                label: "Device Specific Config",
                tooltip: "A collection on device specific config options"
            },
            {
                name: "commLogOptions",
                type: DCSerializable_1.DCFieldType.string,
                label: "Ncontrol Log Options",
                tooltip: "comma seperated list.  options include: polling, matching, rawData, connection, updates"
            },
            {
                name: "status",
                type: DCSerializable_1.DCFieldType.string,
                label: "Status",
                inputDisabled: true,
                tooltip: "The current communications status of the Endpoint"
            },
            {
                name: "enabled",
                type: DCSerializable_1.DCFieldType.bool,
                label: "Enabled?",
                tooltip: "Disable to prevent connection attempts to the Endpoint"
            },
            {
                name: "room_id",
                type: DCSerializable_1.DCFieldType.fk,
                label: "Room",
                tooltip: "Assign this endpoint to room for navigation purposes",
                optional: true
            }
        ]);
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    Object.defineProperty(Endpoint.prototype, "address", {
        get: function () {
            return this.ip;
        },
        set: function (address) {
            this.ip = address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Endpoint.prototype, "commLogOptions", {
        get: function () {
            return this._commLogOptions;
        },
        set: function (val) {
            this._commLogOptions = val;
            var optionsList = val.split(",");
            this.commLogOptionsObj = {};
            for (var _i = 0, optionsList_1 = optionsList; _i < optionsList_1.length; _i++) {
                var opt = optionsList_1[_i];
                this.commLogOptionsObj[opt] = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Endpoint.prototype, "room", {
        get: function () {
            return this._room;
        },
        set: function (newRoom) {
            this.room_id = newRoom._id;
            this._room = newRoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Endpoint.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (newType) {
            this.endpoint_type_id = newType._id;
            this._type = newType;
        },
        enumerable: true,
        configurable: true
    });
    Endpoint.prototype.getControlByCtid = function (ctid) {
        var _this = this;
        var myControls = this.referenced.controls;
        var controlId = Object.keys(myControls).find(function (id) {
            return myControls[id].ctid == _this._id + "-" + ctid || myControls[id].ctid == ctid;
        });
        return this.referenced.controls[controlId];
    };
    Endpoint.prototype.getDataObject = function () {
        return DCSerializable_1.DCSerializable.defaultDataObject(this);
    };
    Endpoint.tableStr = "endpoints";
    return Endpoint;
}(DCSerializable_1.DCSerializable));
exports.Endpoint = Endpoint;
//# sourceMappingURL=Endpoint.js.map