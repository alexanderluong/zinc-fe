import { BASE_API } from "../../config";

export async function fetchFeed(): Promise<Response> {
  try {
    let req = {
      method: "get",
      headers: { "Content-Type": "application/json" }
    };

    return await fetch(`${BASE_API}/feed`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}

export async function submitPost(title: string, uri: string, type: string) {
  try {
    let req = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, uri, type })
    };

    return await fetch(`${BASE_API}/posts`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}
