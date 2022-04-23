let envConfig;

if (process.env.STAGE === "dev") {
  envConfig = {
    urlTableName: "url-table",
    urlStatsTableName: "url-stats-table",
    dynamodb: {
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET",
    },
  };
} else {
  envConfig = {
    urlTableName: "url-table",
    urlStatsTableName: "url-stats-table",
    dynamodb: {
      region: "eu-central-1",
    },
  };
}

export const config = envConfig;
