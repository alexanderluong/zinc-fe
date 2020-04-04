import { BASE_API } from "../../config";

export async function getCompanies(): Promise<Response> {
  try {
    let req = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };

    return await fetch(`${BASE_API}/companies`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}
