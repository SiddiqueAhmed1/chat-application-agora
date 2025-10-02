import axios from "axios";
import dotenv from "dotenv";
import agoraToken from "agora-token";

// config dotenv
dotenv.config();

const getAppToken = async () => {
  // const agora_base_url = process.env.AGORA_BASE_URL;
  // const agora_appName = process.env.AGORA_APP;
  // const agora_orgName = process.env.AGORA_ORG;
  // const agora_client_id = process.env.CLIENT_ID;
  // const agora_client_secret = process.env.CLIENT_SECRET;

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

  // try {
  //   const response = await axios.post(
  //     `${process.env.AGORA_BASE_URL}/${agora_orgName}/${agora_appName}/token`,
  //     {
  //       grant_type: "client_credentials",
  //       client_id: agora_client_id,
  //       client_secret: agora_client_secret,
  //     },
  //     {
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );

  //   return response.data.access_token;
  // } catch (error) {
  //   console.log("Agora get token error", error.response);
  // }
};

export default getAppToken;
