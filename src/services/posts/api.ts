import { BASE_API } from "../../config";

export async function fetchFeed(
  tags: string[] = [],
  companies: string[] = [],
  search: string = ""
): Promise<Response> {
  try {
    let req = {
      method: "get",
      headers: { "Content-Type": "application/json" }
    };

    // TODO fix this for multiple tags
    let req_url = `${BASE_API}/feed?`;
    if (tags[0]) req_url = req_url + "category=" + tags[0];
    if (tags[0] && companies[0]) req_url += "&";
    if (companies[0]) req_url = req_url + "company=" + companies[0];
    console.log(req_url);

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
