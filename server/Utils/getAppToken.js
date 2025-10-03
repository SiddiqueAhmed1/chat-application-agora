import axios from "axios";
import dotenv from "dotenv";
import agoraToken from "agora-token";

// config dotenv
dotenv.config();

const getAppToken = async () => {
  const app_id = process.env.APP_ID;
  const app_certificate = process.env.APP_CERTIFICATE;

  const tokenBuilder = agoraToken.ChatTokenBuilder;
  const expirationInSecond = 86400;

  const appToken = tokenBuilder.buildAppToken(
    app_id,
    app_certificate,
    expirationInSecond
  );

  return appToken;
};

export default getAppToken;
