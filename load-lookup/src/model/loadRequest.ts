import { EquipmentType, Location } from "../constant/requestConstants";

export type LoadRequest = {
    readonly origin: Location;
    readonly destination: Location;
    readonly weight: number;
    readonly equipmentType: EquipmentType;
}

