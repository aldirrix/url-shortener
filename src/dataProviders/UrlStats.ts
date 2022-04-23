import { DocumentClient } from "aws-sdk/clients/dynamodb";

export type UrlStats = {
  originalUrl: string;
  timesGenerated: number;
};

export class UrlStatsDataProvider {
  constructor(
    private readonly documentClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async update(originalUrl: string): Promise<void> {
    await this.documentClient
      .update({
        TableName: this.tableName,
        Key: {
          originalUrl,
        },
        UpdateExpression: `SET timesGenerated = if_not_exists(timesGenerated, :zero) + :increment`,
        ExpressionAttributeValues: {
          ":increment": 1,
          ":zero": 0,
        },
      })
      .promise();
  }
}
