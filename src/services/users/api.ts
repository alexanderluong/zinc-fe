import { BASE_API } from "../../config";

export async function auth(email: string, password: string): Promise<Response> {
  try {
    let req = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    };

    console.log("b");
    return await fetch(`${BASE_API}/users/auth`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}
