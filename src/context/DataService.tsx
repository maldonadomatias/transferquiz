import axios from "axios";

import { Clubs, Players, Transfer } from "../interfaces/transfers";

const URL = "http://ec2-3-139-77-119.us-east-2.compute.amazonaws.com:8000";

const getClubs = async (): Promise<Clubs> => {
  const response = await axios.get(`${URL}/competitions/CDLP/clubs`);
  return response.data;
};

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
