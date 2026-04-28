import axios from "axios";

const username = process.env.REACT_APP_API_USER!;
const password = process.env.REACT_APP_API_PASSWORD!;
const token = btoa(`${username}:${password}`);
export async function getPatients() {
  try {
    const response = await axios.get(
      "https://fedskillstest.coalitiontechnologies.workers.dev",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status !== 200) {
      throw new Error(`Error ${response.status}: Unauthorized`);
    }
    return response.data;
  } catch (error: any) {
    console.error("Fetch error:", error);
  }
}
