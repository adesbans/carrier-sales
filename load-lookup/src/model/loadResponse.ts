import { EquipmentType, Location } from "../constants";

/**
 * Represents a single load record formatted for predictable, AI-friendly consumption.
 * All fields directly correspond to DynamoDB attributes.
 */
export interface LoadResponseItem {
  loadId: string;
  origin: Location;
  destination?: Location;
  pickupDatetime?: string;
  deliveryDatetime?: string;
  equipmentType?: EquipmentType;
  loadboardRate?: number;
  notes?: string;
  weight?: number;
  commodityType?: string;
  numOfPieces?: number;
  miles?: number;
  dimensions?: string;
}

/**
 * Represents the full API response payload returned by Lambda.
 */
export interface LoadResponse {
  totalLoads: number;
  loads: LoadResponseItem[];
}

/**
 * Converts raw DynamoDB items into a predictable, AI-friendly format.
 *
 * @param items - Raw DynamoDB items
 * @returns LoadResponse - total count + formatted loads
 */
export function formatLoadResponse(items: any[]): LoadResponse {
  if (!Array.isArray(items)) {
    throw new Error("Invalid input to formatLoadResponse: expected an array");
  }

  const formattedLoads: LoadResponseItem[] = items.map((item) => {
    const responseItem: LoadResponseItem = { 
        loadId: item.load_id,
        origin: item.origin
    };

    if (item.destination) responseItem.destination = item.destination as Location;
    if (item.pickup_datetime) responseItem.pickupDatetime = String(item.pickup_datetime);
    if (item.delivery_datetime) responseItem.deliveryDatetime = String(item.delivery_datetime);
    if (item.equipment_type) responseItem.equipmentType = item.equipment_type as EquipmentType;
    if (item.loadboard_rate !== undefined) responseItem.loadboardRate = Number(item.loadboard_rate);
    if (item.notes) responseItem.notes = String(item.notes);
    if (item.weight !== undefined) responseItem.weight = Number(item.weight);
    if (item.commodity_type) responseItem.commodityType = String(item.commodity_type);
    if (item.num_of_pieces !== undefined) responseItem.numOfPieces = Number(item.num_of_pieces);
    if (item.miles !== undefined) responseItem.miles = Number(item.miles);
    if (item.dimensions) responseItem.dimensions = String(item.dimensions);

    return responseItem;
  });

  return {
    totalLoads: formattedLoads.length,
    loads: formattedLoads,
  };
}
