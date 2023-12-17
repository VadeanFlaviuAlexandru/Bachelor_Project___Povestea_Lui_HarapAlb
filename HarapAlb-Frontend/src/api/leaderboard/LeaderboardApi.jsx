import {
  longErrorToast
} from "../../utilities/notifications/Notifications";
import token from "../../utilities/player/Token";

export const fetchLeaderboard = async () => {
  let headers = {};

  headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`/SfantaDuminica/leaderboard`, {
    method: "GET",
    headers: headers,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
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
