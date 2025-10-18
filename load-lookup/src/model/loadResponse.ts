import { EquipmentType, Location } from "../constants";

/**
 * Represents a single load record in DynamoDB, formatted for clear downstream consumption.
 */
export interface LoadResponseItem {
  loadId: string;
  origin: Location;
  destination?: Location;
  weight?: number;
  equipmentType?: EquipmentType;
}

/**
 * Represents the full API response payload returned by Lambda.
 * Structured for predictable parsing by an AI model or client application.
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
    if (item.weight !== undefined && item.weight > 0) responseItem.weight = Number(item.weight);
    if (item.equipment_type) {
      responseItem.equipmentType = item.equipment_type as EquipmentType;
    }

    return responseItem;
  });

  return {
    totalLoads: formattedLoads.length,
    loads: formattedLoads,
  };
}
