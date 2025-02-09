import axios from "axios";

const API_URL = "https://autonome.alt.technology/elara-sbzpxp";

/**
 * Sends a message to the Elara API and returns the response.
 * @param message The message to send.
 * @returns Response data from the API.
 */
export const sendMessageToElara = async (message: string) => {
  try {
    const response = await axios.post(
      API_URL,
      { message },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Assuming the API returns JSON
  } catch (error) {
    console.error("Error sending message to Elara:", error);
    return { error: "Failed to get response from Elara" };
  }
};
