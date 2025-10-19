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
export function validateRequestParams(params: Record<string, unknown> = {}): LoadRequest {
  const origin = params["origin"] as Location | undefined;

  if (!origin || typeof origin !== "string" || origin.trim() === "") {
    throw new Error("Missing field: origin");
  }

  const request: LoadRequest = {
    origin
  };

  return request;
}
