import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { config } from "../config";
import { CreateUrlParams, Url, UrlDataProvider } from "../dataProviders";
import { generateRandomBase66String } from "../utils/random";

const urlDataProvider = new UrlDataProvider(
  new DocumentClient(config.dynamodb),
  config.urlTableName
);

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.body == null) {
    return {
      statusCode: 400,
      body: "Missing body in event",
    };
  }

  // TODO: validate that string is valid url
  const { originalUrl } = <CreateUrlParams>JSON.parse(event.body);
  const url: Url = {
    id: `https://tier.app/${generateRandomBase66String()}`,
    originalUrl,
  };

  await urlDataProvider.createUrl(url);

  return {
    statusCode: 201,
    body: JSON.stringify(url),
  };
};
