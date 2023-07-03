const LOCAL_SIGNIN_API_BASE_URL = "http://127.0.0.1:3002/users";
const { v4: uuidv4 } = require("uuid");

const getUserApi = async (type: string, content: string) => {
  try {
    let response;
    if (type === "UUID") {
      response = await fetch(
        `${LOCAL_SIGNIN_API_BASE_URL}/${encodeURI(content)}`,
        {
          method: "GET",
        }
      );
    } else if (type === "EMAIL") {
      response = await fetch(
        `${LOCAL_SIGNIN_API_BASE_URL}/email/${encodeURI(content)}`,
        {
          method: "GET",
        }
      );
    } else {
      return "UNAUTHORIZED";
    }
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

const signUpApi = async (user: any) => {
  try {
    user.uuid = uuidv4();
    const response = await fetch(`${LOCAL_SIGNIN_API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

const signInApi = async (user: any) => {
  try {
    const response = await fetch(
      `${LOCAL_SIGNIN_API_BASE_URL}/email/${encodeURI(user.email)}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (result.errorType && result.errorType === "NON_EXISTENT_USER") {
      return "NON_EXISTENT_USER";
    }

    if (result.password === user.password) {
      await fetch(`${LOCAL_SIGNIN_API_BASE_URL}/${encodeURI(result.uuid)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "SIGNIN",
        }),
      });
      return result;
    } else {
      return "UNAUTHORIZED";
    }
  } catch (e) {
    console.log(e);
  }
};

const signOutApi = async (userId: string) => {
  try {
    await fetch(`${LOCAL_SIGNIN_API_BASE_URL}/${encodeURI(userId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "SIGNOUT",
      }),
    });
    return;
  } catch (e) {
    console.log(e);
  }
};

export default { getUserApi, signUpApi, signInApi, signOutApi };
