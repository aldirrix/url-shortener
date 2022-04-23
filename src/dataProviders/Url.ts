import { DocumentClient } from "aws-sdk/clients/dynamodb";

export type Url = {
  id: string;
  originalUrl: string;
};

export type CreateUrlParams = Omit<Url, "id">;

export class UrlDataProvider {
  constructor(
    private readonly documentClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async createUrl({ id, originalUrl }: Url): Promise<void> {
    await this.documentClient
      .put({
        TableName: this.tableName,
        Item: {
          id,
          originalUrl,
        },
      })
      .promise();
  }
}
