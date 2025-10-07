let environment = "production";

const base_url = `${
  environment === "production"
    ? "https://chat-application-react-node-server.onrender.com"
    : "http://localhost:6060"
}`;

export default base_url;
