import { EquipmentType, Location } from "../constants";

export type LoadRequest = {
    readonly origin: Location;
    readonly destination?: Location;
    readonly weight?: number;
    readonly equipmentType?: EquipmentType;
}

