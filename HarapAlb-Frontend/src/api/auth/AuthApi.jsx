import Cookies from "js-cookie";
import {
  longErrorToast,
  successToast,
} from "../../utilities/notifications/Notifications";

export const logInUser = async (payload = {}) => {
  const headers = {
    "Content-type": "application/json",
  };
  const response = await fetch(`/SfantaDuminica/signIn`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) {
    const data = await response.json();
    Cookies.set("HarapAlb_Access_Token", data.token, { expires: 7 });
    return data;
  } else if (response.status === 403) {
    longErrorToast(
      "Nu ti-ai scris credentialele bine! uita-te din nou si incercam din nou."
    );
    throw new Error("Failed to log in. Please re-enter your credentials.");
  } else if (response.status === 404) {
    longErrorToast("Se pare ca serverele sunt offline.. incearca mai incolo.");
    throw new Error("Failed to log in. Please re-enter your credentials.");
  } else {
    longErrorToast("An error occured. Please try again!");
    throw new Error("An error occured. Please try again!");
  }
};

export const signUpUser = async (payload = {}) => {
  const headers = {
    "Content-type": "application/json",
  };
  const response = await fetch(`/SfantaDuminica/signUp`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) {
    successToast("Cont creat cu success!");
    return response;
  } else if (response.status === 403) {
    longErrorToast(
      "An account associated with this e-maill address already exists!"
    );
    throw new Error(
      "An account associated with this e-maill address already exists!"
    );
  } else if (response.status === 404) {
    longErrorToast("Se pare ca serverele sunt offline.. incearca mai incolo.");
    throw new Error("Failed to log in. Please re-enter your credentials.");
  } else {
    longErrorToast("An error occured. Please try again!");
    throw new Error("An error occured. Please try again!");
  }
};
