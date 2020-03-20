import { BASE_API } from "../../config";

export async function fetchFeed(
  tag: string = "",
  company: string = "",
  search: string = ""
): Promise<Response> {
  try {
    let req = {
      method: "get",
      headers: { "Content-Type": "application/json" }
    };

    // TODO fix this for multiple tags
    let req_url = `${BASE_API}/feed?`;
    if (tag !== "") req_url = req_url + "category=" + tag;
    if (tag !== "" && company !== "") req_url += "&";
    if (company !== "") req_url = req_url + "company=" + company;
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
