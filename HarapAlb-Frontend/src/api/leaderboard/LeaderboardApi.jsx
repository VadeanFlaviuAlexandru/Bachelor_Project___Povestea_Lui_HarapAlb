import { longErrorToast } from "../../utilities/notifications/Notifications";
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

export const addLeaderboardScore = async (payload = {}, id) => {
  const headers = {
    "Content-type": "application/json",
  };
  const response = await fetch(`/SfantaDuminica/leaderboard/add/${id}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status === 403) {
    longErrorToast("error1");
    throw new Error("error2");
  } else if (response.status === 404) {
    longErrorToast("error3");
    throw new Error("error4");
  } else {
    longErrorToast("A apărut o eroare. Te rog încearcă din nou!");
    throw new Error("A apărut o eroare. Te rog încearcă din nou!");
  }
};

export const updateLeaderboardScore = async (payload = {}, id) => {
  const headers = {
    "Content-type": "application/json",
  };
  const response = await fetch(`/SfantaDuminica/leaderboard/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status === 403) {
    longErrorToast("error1u");
    throw new Error("error2u");
  } else if (response.status === 404) {
    longErrorToast("error3u");
    throw new Error("error4u");
  } else {
    longErrorToast("A apărut o eroare. Te rog încearcă din nou!");
    throw new Error("A apărut o eroare. Te rog încearcă din nou!");
  }
};
