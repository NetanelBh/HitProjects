import mongoConnection from "../DBConnection/mongoConnection.js";
import { reminderCheck } from "../scheduler/dailyCheck.js";

export default async function handler(req, res) {
  try {

    await mongoConnection();

    console.log("🔔 running reminder check");

    await reminderCheck();

    return res.status(200).json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
}