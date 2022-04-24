# url-shortener

This repository contains a service that shortens and keeps stats of urls.

The service is implemented in `Typescript` running on `AWS Lambda`.
The [Serverless Framework](https://serverless.com/) is used to deploy it.

The service uses `DynamoDb` to store the url's data.

## Deploy and run

First make sure the dependencies are installed.

```sh
yarn
```

Afterwards you can deploy the service.

```sh
yarn deploy
```

Now you should be able to interact with the REST API of the service.
The API endpoints can be found in the output that `serverless deploy` produces.

## Local development

To avoid always having to deploy the changes to the cloud in order to see the behaviour of the function, you can run:

```sh
yarn dependencies # only the first time
yarn start
```

For now, only `post` to the `url endpoint` and saving to the `url table` behaviour is working because I couldn't figure out in a timely manner how (if possible) to have the dynamodb streams functionality when using local machine.

You can access the endpoint locally in `http://localhost:3000/dev/url`

## Behaviour

Executing a `post` request to the `url` endpoint:

```sh
curl -X POST https://<api-id>.execute-api.eu-central-1.amazonaws.com/prod/url -d '{"originalUrl": "https://example.com/foo"}'
```

### Body

```json
{
  "originalUrl": "https://example.com/foo"
}
```

### Response

```json
{
  "id": "https://tier.app/DIPMapJ",
  "originalUrl": "https://examle.com/foo"
}
```

In the background, a new record is inserted to the `url` table. This table has a [Dynamodb stream](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html) enabled that emits an event, then a lambda function is triggered by this. This lambda is in charge of keeping track of how many times a specific url has been shortened (while writing this I realised that `timesShortened` might be a better name than `timesGenerated`).

For now there's no endpoint that allows to fetch this url stats but it can be seen inside the `AWS` console:

![url stats table overview](/docs/url-stats-overview.png)

## Clean up

To remove this application, run the following after you are done:

```sh
yarn run serverless remove --stage prod
```

## TODOs

Some nice to have features and cleanup/refactors are in order or what I consider most important to less important:

- No validation other than the body not being `falsy` is set on the `post url` endpoint, we should validate that `originalUrl` is part of the request's body and that the contents of this property is a valid url string.

- Error handling and proper responses for lambda executions should be implemented.

- Investigate for a better algorithm to provide more uniqueness to the shortened url.

- Add unit/integration tests.

- Introduce a CI/CD pipeline.

- Change `timesGenerated` to `timesShortened` in the url stats.

- Investigate if the `dynamodb-local` package can work with streams to trigger lambda functions for local development.

- Investigate to find a solution for local environment variables that reference resources instead having to hardcode them.
