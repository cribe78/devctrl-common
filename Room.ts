import {DCSerializableData, DCSerializable, DCFieldType} from "./DCSerializable";

export interface RoomData extends DCSerializableData {
    name: string;
    config: any;
}


export class Room extends DCSerializable {
    static tableStr = "rooms";
    tableLabel = "Rooms";
    table: string;
    config : any = {};

    constructor(_id: string, data?: RoomData) {
        super(_id);
        this.table = Room.tableStr;

        this.referenced = {
            'panels' : {}
        };


        this.fieldDefinitions = this.fieldDefinitions.concat([
            {
                name: "config",
                type: DCFieldType.object,
                label: "Room Config Data",
                tooltip: "Room configuration object",
                defaultValue: {}
            }
        ]);

        if (data) {
            this.loadData(data);
        }
    }
}