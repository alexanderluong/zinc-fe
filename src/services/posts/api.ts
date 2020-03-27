import { BASE_API } from "../../config";

export async function fetchFeed(
  tags: string[] = [],
  companies: string[] = [],
  search: string = ""
): Promise<Response> {
  try {
    let req = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categories: tags,
        companies: companies
      })
    };

    let req_url = `${BASE_API}/feed`;
    return await fetch(req_url, req);
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
