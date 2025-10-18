import { EquipmentType, Location } from "../constant/requestConstants";
import { LoadRequest } from "../model/loadRequest";

export enum QueryKey {
  LoadId = "load_id",
  Origin = "origin",
  Destination = "destination",
  EquipmentType = "equipment_type",
  LoadWeight = "load_weight",
}

export const INDEX_MAP: Record<QueryKey, string | null> = {
  [QueryKey.LoadId]: null,
  [QueryKey.Origin]: "OriginIndex",
  [QueryKey.Destination]: "DestinationIndex",
  [QueryKey.EquipmentType]: "EquipmentTypeIndex",
  [QueryKey.LoadWeight]: "LoadWeightIndex",
};

export interface ValidatedQuery {
  key: QueryKey;
  value: string | number;
  indexName: string | null;
  isPrimary: boolean;
}

/** Validate environment variables required for runtime */
export function validateEnvironmentVariables(): { loadsTable: string } {
  const loadsTable = process.env.LOADS_TABLE;
  if (!loadsTable) {
    throw new Error(`Missing required environment variable: ${loadsTable}`);
  }
  return { loadsTable };
}

/** Validate and normalize request query parameters */
export function validateRequestParams(body: Record<string, unknown> = {}): LoadRequest {
  try {
    const request: LoadRequest = {
      origin: body["origin"] as Location,
      destination: body["destination"] as Location,
      weight: body["weight"] as number,
      equipmentType: body["equipmentType"] as EquipmentType,
    };

    return request;
  } catch (err) {
    throw new Error(`Request validation failed: invalid or missing fields in request body. Error details: ${err}`);
  }
}
