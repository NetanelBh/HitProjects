import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "default" }), // store locally
  puppeteer: { headless: false }, // set to true in production
});

client.on("ready", () => {
  console.log("WhatsApp client ready ✅");
});

client.on("auth_failure", (msg) => {
  console.error("Authentication failure:", msg);
});

client.initialize();

export default client;