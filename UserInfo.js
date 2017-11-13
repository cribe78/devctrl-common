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
var ClientType;
(function (ClientType) {
    ClientType["web"] = "web";
    ClientType["ncontrol"] = "ncontrol";
    ClientType["watcher"] = "watcher";
})(ClientType = exports.ClientType || (exports.ClientType = {}));
var UserInfo = (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo(_id, data) {
        var _this = _super.call(this, _id) || this;
        _this.tableLabel = "User Info";
        _this.ownFields = [
            {
                name: "clientType",
                type: DCSerializable_1.DCFieldType.string,
                label: "Client Type",
                tooltip: "The type of client"
            }
        ];
        _this.table = UserInfo.tableStr;
        _this.fieldDefinitions = _this.fieldDefinitions.concat(_this.ownFields);
        if (data) {
            _this.loadData(data);
        }
        return _this;
    }
    UserInfo.tableStr = "userInfo";
    return UserInfo;
}(DCSerializable_1.DCSerializable));
exports.UserInfo = UserInfo;
//# sourceMappingURL=UserInfo.js.map