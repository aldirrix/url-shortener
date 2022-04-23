import env from "env-var";
import type { DynamoDB } from "aws-sdk";

type StageConfig = {
  urlTableName: string;
  urlStatsTableName: string;
  dynamodb?: DynamoDB.Types.ClientConfiguration;
};

const stage = env.get("STAGE").default("dev").asString();

const envConfig: StageConfig = {
  urlTableName: env.get("URL_TABLE_NAME").required().asString(),
  urlStatsTableName: env.get("URL_STATS_TABLE_NAME").required().asString(),
};

if (stage === "dev") {
  envConfig.dynamodb = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "DEFAULT_ACCESS_KEY",
    secretAccessKey: "DEFAULT_SECRET",
  };
  // serverless offline cannot reference resource return values so we have
  // to hardcode the values for now, further investigation is needed
  // Ref: https://github.com/dherault/serverless-offline/issues/198
  envConfig.urlTableName = "url-table";
  envConfig.urlStatsTableName = "url-stats-table";
}

export const config = envConfig;
