import { EquipmentType, Location } from "../constants";
import { LoadRequest } from "../model/loadRequest";

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
  const origin = body["origin"] as Location;

  if (!origin) {
    throw new Error("Missing required field: origin");
  }

  const request: LoadRequest = {
    origin,
    destination: body["destination"] as Location | undefined,
    weight: body["weight"] !== undefined ? (body["weight"] as number) : undefined,
    equipmentType: body["equipmentType"] as EquipmentType | undefined,
  };

  return request;
}
