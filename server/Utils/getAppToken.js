import axios from "axios";
import dotenv from "dotenv";

// config dotenv
dotenv.config();

const getAppToken = async () => {
  const agora_base_url = process.env.AGORA_BASE_URL;
  const agora_app = process.env.AGORA_APP;
  const agora_org = process.env.AGORA_ORG;
  const agora_client_id = process.env.CLIENT_ID;
  const agora_client_secret = process.env.CLIENT_SECRET;

  try {
    const response = await axios.post(
      `${agora_base_url}/${agora_org}/${agora_app}/token`,
      {
        grant_type: "client_credentials",
        client_id: agora_client_id,
        client_secret: agora_client_secret,
      }
    );

    response.data.access_token;
  } catch (error) {
    console.log("Agora get token error", error.message);
  }
};

export default getAppToken;
