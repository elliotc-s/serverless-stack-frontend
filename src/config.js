const dev = {
  STRIPE_KEY: "pk_test_51JHSFuIaT82ZN34m2GEfOGKQIxzAFIF9TaFWbhWMk2LvhqyL8f0UVwPoaxOlQltf3IZRE9pOzzT8iYtnYcz1ZCVK00SlrW7Oqh",
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-notes-infra-s3-uploads4f6eb0fd-1lwqzt68dd6xt"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.notes.serverless-stuff.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_hRUZnXkya",
    APP_CLIENT_ID: "1lha6mr956gj9for7sacb44ijr",
    IDENTITY_POOL_ID: "us-east-1:edb9cd86-bc42-4297-b71f-fd57def78360"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51JHSFuIaT82ZN34m2GEfOGKQIxzAFIF9TaFWbhWMk2LvhqyL8f0UVwPoaxOlQltf3IZRE9pOzzT8iYtnYcz1ZCVK00SlrW7Oqh",
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-notes-infra-s3-uploads4f6eb0fd-2lzzeupcokh9"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.notes.serverless-stuff.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Qy5PBGmno",
    APP_CLIENT_ID: "6tkao4qspqndve4degpl1d3hsg",
    IDENTITY_POOL_ID: "us-east-1:b760ad7d-285c-4923-9738-7bc34b4204c1"
  }
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;