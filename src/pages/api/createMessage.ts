import { createClient } from "next-sanity";
import clientConfig from "./../../../sanity/config/client-config";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.log("Method not allowed");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (req.body) {
    const { name, email, message } = req.body;
    try {
      const response = await createClient(clientConfig).create({
        _type: "guestbook",
        name,
        email,
        message,
      });
      res.status(200).json({ message: "Message created", response });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
