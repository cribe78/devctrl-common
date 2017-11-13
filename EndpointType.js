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
var EndpointType = (function (_super) {
    __extends(EndpointType, _super);
    function EndpointType(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.tableLabel = "Endpoint Types";
        _this.ownFields = [
            {
                name: "communicatorClass",
                type: DCSerializable_1.DCFieldType.string,
                label: "Communicator Class",
                tooltip: "The path to the communicator class file"
            }
        ];
        _this.table = EndpointType.tableStr;
        _this.referenced = {
            endpoints: {}
        };
        _this.fieldDefinitions = _this.fieldDefinitions.concat(_this.ownFields);
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    EndpointType.tableStr = "endpoint_types";
    return EndpointType;
}(DCSerializable_1.DCSerializable));
exports.EndpointType = EndpointType;
//# sourceMappingURL=EndpointType.js.map