import axios from "axios";
import getAppToken from "../Utils/getAppToken.js";
import agoraToken from "agora-token";

const userRegisterController = async (req, res) => {
  const agora_base_url = process.env.AGORA_BASE_URL;
  const agora_app = process.env.AGORA_APP;
  const agora_org = process.env.AGORA_ORG;
  const ChatTokenBuilder = agoraToken.ChatTokenBuilder;
  const app_id = process.env.APP_ID;
  const app_certificate = process.env.APP_CERTIFICATE;
  const expirationInSecond = 86400;

  try {
    const { email, password } = req.body;

    // email, password fields check
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Email format is wrong" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: "Password must be grater than 6" });
      return;
    }

    // make user name from email
    const userName = email.replace(/[@.]/g, "_");
    const appToken = await getAppToken();

    // Register user with agora
    await axios.post(
      `${agora_base_url}/${agora_org}/${agora_app}/users`,
      {
        username: userName,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
        },
      }
    );

    // user token create
    const userToken = ChatTokenBuilder.buildUserToken(
      app_id,
      app_certificate,
      userName,
      expirationInSecond
    );

    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: {
        userId: userName,
        accessToken: userToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
    console.log("ki error eita", error);
  }
};

export const userLogin = () => {
  try {
  } catch (error) {}
};

export default userRegisterController;
