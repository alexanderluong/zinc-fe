import { BASE_API } from "../../config";

export async function getSubscriptions(): Promise<Response> {
    try {
      let req = {
        method: "get",
        headers: { "Content-Type": "application/json" }
      };
  
      return await fetch(`${BASE_API}/categories`, req);
    } catch (err) {
      // Process?
      throw err;
    }
  }