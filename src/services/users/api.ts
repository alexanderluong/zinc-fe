import { BASE_API } from "../../config";

export async function auth(email: string, password: string): Promise<Response> {
  try {
    let req = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    return await fetch(`${BASE_API}/users/auth`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    let req = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    };

    // console.log(req.body);
    // console.log("create_user");
    return await fetch(`${BASE_API}/users`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}

export async function getUserInfo(userToken: string): Promise<Response> {
  try {
    let req = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await fetch(`${BASE_API}/users/me`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}

export async function putUser(
  userToken: string,
  userSubscriptions: string[]
): Promise<Response> {
  try {
    let req = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({ subscriptions: userSubscriptions }),
    };

    return await fetch(`${BASE_API}/users/`, req);
  } catch (err) {
    // Process?
    throw err;
  }
}
