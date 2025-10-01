import axios from "axios";
import getAppToken from "../Utils/getAppToken.js";

const userRegisterController = async (req, res) => {
  const agora_base_url = process.env.AGORA_BASE_URL;
  const agora_app = process.env.AGORA_APP;
  const agora_org = process.env.AGORA_ORG;

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
    if (emailRegex.test(email)) {
      return res.status(400).json({ message: "Email format is wrong" });
    }

    if (password.length > 6) {
      return res
        .status(400)
        .json({ message: "Password must be grater than 6" });
    }

    // make user name from email
    const userName = email.replace(/[@.]/g, "_");

    const appToken = await getAppToken();

    await axios.post(
      `${agora_base_url}/${agora_org}/${agora_app}/users`,
      {
        username: userName,
        password: password,
        nickname: email,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${appToken}`,
        },
      }
    );

    // generate user token
    const generateUserToken = async () => {
      const tokenResponse = await axios.post(
        `${agora_base_url}/${agora_org}/${agora_app}/users/${userName}/token`,
        {
          grant_type: "inherit",
          ttl: 60 * 60 * 24 * 90,
        },
        {
          headers: {
            Authorization: `Bearer ${appToken}`,
          },
        }
      );
      res.json({
        success: true,
        message: "Login successful",
        data: {
          userId: userName,
          accessToken: tokenResponse.data.access_token,
        },
      });
    };
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

export default userRegisterController;
