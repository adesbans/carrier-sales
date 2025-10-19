import { EquipmentType, Location, QueryKey } from "../constants";

export type LoadRequest = {
  readonly primaryKey?: QueryKey
  readonly origin: Location;
  readonly destination?: Location;
  readonly pickupDatetime?: string;
  readonly deliveryDatetime?: string;
  readonly equipmentType?: EquipmentType;
  readonly loadboardRate?: number;
  readonly notes?: string;
  readonly weight?: number;
  readonly commodityType?: string;
  readonly numOfPieces?: number;
  readonly miles?: number;
  readonly dimensions?: string;
};
