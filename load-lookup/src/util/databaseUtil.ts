import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { QueryKey, INDEX_MAP } from "../constants";

/**
 * Create and reuse a single DynamoDB DocumentClient instance.
 * This is initialized once per Lambda container (cold start) and reused across invocations.
 */
const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
  })
);

/**
 * Minimal helper to query the Loads table by a given key.
 * Automatically looks up the correct index name based on QueryKey.
 *
 * @param tableName - Name of the DynamoDB table
 * @param key - The QueryKey (e.g., Origin, Destination, EquipmentType)
 * @param value - The value to match for that key
 * @returns Array of matching items
 */
export async function queryLoads<T = any>(
  tableName: string,
  key: QueryKey,
  value: string | number
): Promise<T[]> {
  const indexName = INDEX_MAP[key]; // Will be null for primary key queries
  const attributeName = key;        // Key name in your table (e.g., "origin")

  const cmd = new QueryCommand({
    TableName: tableName,
    ...(indexName ? { IndexName: indexName } : {}),
    KeyConditionExpression: "#k = :v",
    ExpressionAttributeNames: { "#k": attributeName },
    ExpressionAttributeValues: { ":v": value },
  });

  const res = await ddb.send(cmd);
  return (res.Items as T[]) ?? [];
}