import axios from "axios";

import { Clubs, Players, Transfer } from "../interfaces/transfers";

// const URL = "http://localhost:8000";
const URL = process.env.TRANSFERMARKT_URL;

async function getClubs(): Promise<Clubs> {
  const response = await axios.get(`${URL}/competitions/CDLP/clubs`);
  return response.data;
}

const getPlayers = async (id: number): Promise<Players> => {
  const response = await axios.get(`${URL}/clubs/${id}/players`);
  return response.data;
};

const getTransfers = async (id: number): Promise<Transfer> => {
  const response = await axios.get(`${URL}/players/${id}/transfers`);
  return response.data;
};

const getBadge = async (id: number): Promise<string> => {
  const response = await axios.get(`${URL}/clubs/${id}/profile`);
  return response.data.image;
};

const dataService = {
  getClubs,
  getPlayers,
  getTransfers,
  getBadge,
};

export default dataService;
