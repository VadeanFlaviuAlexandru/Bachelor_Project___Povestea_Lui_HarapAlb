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
    Cookies.set("HarapAlb_Access_Token", data.token);
    return data;
  } else if (response.status === 403) {
    longErrorToast(
      "Verifică din nou credențialele; s-a întâmplat o eroare la scriere. Haide să încercăm din nou."
    );
    throw new Error(
      "Verifică din nou credențialele; s-a întâmplat o eroare la scriere. Haide să încercăm din nou."
    );
  } else if (response.status === 404) {
    longErrorToast(
      "Pare că serverele sunt offline. Te rog încearcă mai târziu."
    );
    throw new Error(
      "Pare că serverele sunt offline. Te rog încearcă mai târziu."
    );
  } else {
    longErrorToast("A apărut o eroare. Te rog încearcă din nou!");
    throw new Error("A apărut o eroare. Te rog încearcă din nou!");
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
    longErrorToast("Există deja un cont asociat cu această adresă de e-mail.");
    throw new Error("Există deja un cont asociat cu această adresă de e-mail.");
  } else if (response.status === 404) {
    longErrorToast(
      "Pare că serverele sunt offline. Te rog încearcă mai târziu."
    );
    throw new Error(
      "Pare că serverele sunt offline. Te rog încearcă mai târziu."
    );
  } else {
    longErrorToast("A apărut o eroare. Te rog încearcă din nou!");
    throw new Error("A apărut o eroare. Te rog încearcă din nou!");
  }
};
