import axios from "axios";
import { longErrorToast } from "../../utilities/notifications/Notifications";
import token from "../../utilities/player/Token";

export const fetchLeaderboard = async () => {
  let headers = {};

  headers.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.get("/SfantaDuminica/leaderboard", {
      headers: headers,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    longErrorToast(
      "A apărut o eroare. Cel mai probabil serverele sunt offline. Te rog încearcă mai târziu!"
    );
    throw new Error(
      "A apărut o eroare. Cel mai probabil serverele sunt offline. Te rog încearcă mai târziu!"
    );
  }
};

export const addLeaderboardScore = async (payload = {}, id) => {
  let headers = {};

  headers.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.post(
      `/SfantaDuminica/leaderboard/add/${id}`,
      payload,
      {
        headers: headers,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    longErrorToast("A apărut o eroare.");
    throw new Error("A apărut o eroare.");
  }
};

export const updateLeaderboardScore = async (payload = {}) => {
  let headers = {};

  headers.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.put(
      "/SfantaDuminica/leaderboard/edit",
      payload,
      {
        headers: headers,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    longErrorToast("A apărut o eroare.");
    throw new Error("A apărut o eroare.");
  }
};
