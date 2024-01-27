import axios from "axios";
import Cookies from "js-cookie";
import {
  longErrorToast,
  successToast,
} from "../../utilities/notifications/Notifications";

export const logInUser = async (payload = {}) => {
  const headers = {
    "Content-type": "application/json",
  };

  try {
    const response = await axios.post("/SfantaDuminica/signIn", payload, {
      headers: headers,
    });
    if (response.status === 200) {
      Cookies.set("HarapAlb_Access_Token", response.data.token);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      longErrorToast(
        "Există deja un cont asociat cu această adresă de e-mail."
      );
      throw new Error(
        "Există deja un cont asociat cu această adresă de e-mail."
      );
    } else {
      longErrorToast(
        "A apărut o eroare. Cel mai probabil serverele sunt offline. Te rog încearcă mai târziu!"
      );
      throw new Error(
        "A apărut o eroare. Cel mai probabil serverele sunt offline. Te rog încearcă mai târziu!"
      );
    }
  }
};

export const signUpUser = async (payload = {}) => {
  const headers = {
    "Content-type": "application/json",
  };

  try {
    const response = await axios.post("/SfantaDuminica/signUp", payload, {
      headers: headers,
    });
    if (response.status === 200) {
      successToast("Cont creat cu success!");
      return response;
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      longErrorToast(
        "Există deja un cont asociat cu această adresă de e-mail."
      );
      throw new Error(
        "Există deja un cont asociat cu această adresă de e-mail."
      );
    } else {
      longErrorToast(
        "A apărut o eroare. Cel mai probabil serverele sunt offline. Te rog încearcă mai târziu!"
      );
      throw new Error(
        "A apărut o eroare. Cel mai probabil serverele sunt offline. Te rog încearcă mai târziu!"
      );
    }
  }
};
