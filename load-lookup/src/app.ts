import { QueryKey } from "./constants";
import { LoadRequest } from "./model/loadRequest";
import { formatLoadResponse } from "./model/loadResponse";
import { queryLoads } from "./util/databaseUtil";
import { validateEnvironmentVariables, validateRequestParams } from "./util/validationUtil";

export const lambdaHandler = async (event: any, context: any) => {
  try {
    const payload = event?.queryStringParameters ?? {};
    const request: LoadRequest = validateRequestParams(payload);
    const { loadsTable } = validateEnvironmentVariables();

    const matchedLoads = await queryLoads(loadsTable, QueryKey.Origin, request.origin);
    const formattedLoads = formatLoadResponse(matchedLoads);

    const formattedResponse = {
      statusCode: 200,
      body: JSON.stringify(formattedLoads)
    };

    return formattedResponse;
  } catch (err) {
    console.error(`Error occurred while handling the request: ${err}`)
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'failed load results',
      })
    };

    return response;
  }
    
};
