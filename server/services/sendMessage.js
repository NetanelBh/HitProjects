import { client } from "../whatsapp/client.js";

export const sendWhatsAppMessage = async (groupId, message) => {
  try {
    await client.sendMessage(groupId, message);
    console.log("Message sent ✅");
  } catch (err) {
    console.error("Send failed ❌", err);
  }
};