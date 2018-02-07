/**
 * Created by chris on 8/17/16.
 */

import {DCFieldType, DCSerializable, DCSerializableData} from "./DCSerializable";
import {EndpointType} from "./EndpointType";
import {Room} from "./Room";
import {IndexedDataSet} from "./DCDataModel";
import {Control} from "./Control";

export interface IEndpointStatus {
    enabled?: boolean; // Is the Endpoint set to enabled (through DevCtrl UI)?
    messengerConnected?: boolean; // Has the communicator established a connection to the messenger?
    reachable?: boolean; // Is the endpoint pingable?
    connected?: boolean; // Has a TCP connection to the device been established?
    loggedIn?: boolean; // Has the communicator successfully logged in to the device?
    polling?: boolean; // Is the communicator polling the device
    responsive?: boolean; // Is the device satisfactorily responding to communications?
    ok?: boolean; // Are all other members true?
}


export interface EndpointData extends DCSerializableData {
    endpoint_type_id: string;
    epStatus: IEndpointStatus;
    ip: string;
    port: number;
    enabled: boolean;
    commLogOptions: string;
}


export class Endpoint extends DCSerializable {
    private _type: EndpointType;
    private _room: Room;
    endpoint_type_id: string;
    room_id : string;
    epStatus: IEndpointStatus = {
        enabled: false,
        messengerConnected: false,
        reachable: false,
        connected: false,
        loggedIn: false,
        polling: false,
        responsive: false,
        ok: false
    };

    ip: string = "";
    port: number = 0;
    config: any = {};

    private _commLogOptions : string = "default";
    commLogOptionsObj : {};

    static tableStr = "endpoints";
    tableLabel = "Endpoints";
    foreignKeys = [
        {
            type: EndpointType,
            fkObjProp: "type",
            fkIdProp: "endpoint_type_id",
            fkTable: EndpointType.tableStr
        },
        {
            type: Room,
            fkObjProp: "room",
            fkIdProp: "room_id",
            fkTable: Room.tableStr
        }
    ];

    constructor(_id: string, data?: EndpointData) {
        super(_id);
        this.table = Endpoint.tableStr;

        this.referenced = {
            'controls' : {}
        };


        this.fieldDefinitions = this.fieldDefinitions.concat([
            {
                name: "endpoint_type_id",
                type: DCFieldType.fk,
                label: "Endpoint Type",
                tooltip: "Determines the control protocol used for device communication"
            },
            {
                name: "ip",
                type: DCFieldType.string,
                label: "Address",
                tooltip: "The IP or device address"
            },
            {
                name: "port",
                type: DCFieldType.int,
                label: "Port",
                tooltip: "The TCP port number for a networked device"
            },
            {
                name: "config",
                type: DCFieldType.object,
                label: "Device Specific Config",
                tooltip: "A collection on device specific config options"
            },
            {
                name : "commLogOptions",
                type: DCFieldType.string,
                label: "Ncontrol Log Options",
                tooltip: "comma seperated list.  options include: polling, matching, rawData, connection, updates"
            },
            {
                name: "epStatus",
                type: DCFieldType.endpointStatus,
                label: "Status",
                tooltip: "The current communications status of the Endpoint",
                defaultValue: {
                    enabled: false,
                    messengerConnected: false,
                    reachable: false,
                    connectionEstablished: false,
                    loggedIn: false,
                    responsive: false,
                    ok: false
                }
            },
            {
                name: "enabled",
                type: DCFieldType.bool,
                label: "Enabled?",
                tooltip: "Disable to prevent connection attempts to the Endpoint",
                defaultValue: false
            },
            {
                name: "room_id",
                type: DCFieldType.fk,
                label: "Room",
                tooltip: "Assign this endpoint to room for navigation purposes",
                optional: true
            }
        ]);


        if (data) {
            this.loadData(data);
        }
    }

    get address() : string {
        return this.ip;
    }

    set address(address: string) {
        this.ip = address;
    }

    cloneStatus() : IEndpointStatus {
        let es = this.epStatus;
        return {
            enabled: es.enabled,
            messengerConnected: es.messengerConnected,
            reachable: es.reachable,
            connected: es.connected,
            loggedIn: es.loggedIn,
            polling: es.polling,
            responsive: es.responsive,
            ok: es.ok
        }
    }

    compareStatus(es2: IEndpointStatus) : boolean {
        let es = this.epStatus;

        for (let f in es2) {
            if (es2[f] != es[f]) {
                return false;
            }
        }

        return true;
    }


    get commLogOptions() {
        return this._commLogOptions;
    }

    set commLogOptions(val) {
        this._commLogOptions = val;

        let optionsList = val.split(",");
        this.commLogOptionsObj = {};

        for( let opt of optionsList) {
            this.commLogOptionsObj[opt] = true;
        }
    }

    get enabled() : boolean {
        return this.epStatus.enabled;
    }

    set enabled(val: boolean) {
        this.epStatus.enabled = val;
    }

    get room() : Room {
        return this._room;
    }

    set room(newRoom : Room) {
        this.room_id = newRoom._id;
        this._room = newRoom;
    }

    statusDiff(es2: IEndpointStatus) : IEndpointStatus {
        let statusDiff : IEndpointStatus = {};
        let es = this.epStatus;

        for (let f in es2) {
            if (es2[f] != es[f]) {
                statusDiff[f] = es2[f];
            }
        }

        return statusDiff;
    }

    get statusStr() : string {
        let statusStr = "";
        statusStr += this.epStatus.messengerConnected ? "MSGR " : ".... ";
        statusStr += this.epStatus.enabled ? "EN " : ".. ";
        statusStr += this.epStatus.reachable ? "PING " : ".... ";
        statusStr += this.epStatus.connected ? "CONN " : ".... ";
        statusStr += this.epStatus.loggedIn ? "LGIN " : ".... ";
        statusStr += this.epStatus.polling ? "POLL " : ".... ";
        statusStr += this.epStatus.responsive ? "RSPV " : ".... ";
        statusStr += this.epStatus.ok ? "OK" : "..";

        return statusStr;
    }

    get type(): EndpointType {
        return this._type;
    }

    set type(newType: EndpointType) {
        this.endpoint_type_id = newType._id;
        this._type = newType;
    }

    getControlByCtid(ctid: string) {
        let myControls = <IndexedDataSet<Control>>this.referenced.controls;
        let controlId =  Object.keys(myControls).find( id => {
                return myControls[id].ctid == this._id + "-" + ctid || myControls[id].ctid == ctid;
            });

        return this.referenced.controls[controlId];

    }

    getDataObject() : EndpointData {
        let obj = <EndpointData>DCSerializable.defaultDataObject(this);
        obj.epStatus = this.cloneStatus();
        return obj;
    }
}