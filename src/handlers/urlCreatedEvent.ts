import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { config } from "../config";
import { Url, UrlStatsDataProvider } from "../dataProviders";

const urlStatsDataProvider = new UrlStatsDataProvider(
  new DocumentClient(config.dynamodb),
  config.urlStatsTableName
);

type CreatedUrlDynamoStreamEvent = {
  Records: {
    eventName: "INSERT";
    dynamodb: {
      NewImage: DynamoDB.AttributeMap;
    };
  }[];
};

export const handler = async (
  event: CreatedUrlDynamoStreamEvent
): Promise<void> => {
  for (const { dynamodb } of event.Records) {
    const newUrl = <Url>DynamoDB.Converter.unmarshall(dynamodb.NewImage);

    await urlStatsDataProvider.update(newUrl.originalUrl);
  }
};
