const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "ecs-notes-app-upload",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://tslcpjdp52.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_TvV5uvk9j",
      APP_CLIENT_ID: "5t601psubncn6sj2cga1gju7ov",
      IDENTITY_POOL_ID: "us-east-1:6c32ace6-9133-45f6-b9dd-65698de427c6",
    },
  };

  export default config;