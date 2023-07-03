const LOCAL_CART_API_BASE_URL = "http://localhost:3002/users";

const modCartApi = async (userId: string, cart: any) => {
  try {
    await fetch(`${LOCAL_CART_API_BASE_URL}/${encodeURI(userId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cart }),
    });
    return;
  } catch (e) {
    console.log(e);
  }
};

export default { modCartApi };
