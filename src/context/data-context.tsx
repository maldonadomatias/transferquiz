import { createContext, useContext } from "react";
import { toast } from "react-hot-toast";

import { Transfer } from "../interfaces/transfers";
import dataService from "./DataService";

interface DataContextData {
  fetchAndDisplayTransfers: () => Promise<Transfer | undefined>;
  getBadge: (id: string) => Promise<string>;
}

const DataContext = createContext<DataContextData | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const getClubs = async () => {
    try {
      const clubs = await dataService.getClubs();
      const randomIndex = Math.floor(Math.random() * clubs.clubs.length);
      return clubs.clubs[randomIndex].id;
    } catch (error) {
      toast.error("Error fetching clubs");
      throw error; // Re-throw the error to propagate it
    }
  };

  const getPlayers = async (id: string) => {
    try {
      const players = await dataService.getPlayers(parseInt(id));
      const randomIndex = Math.floor(Math.random() * players.players.length);
      return players.players[randomIndex].id;
    } catch (error) {
      toast.error("Error fetching players");
      throw error; // Re-throw the error to propagate it
    }
  };

  const getTransfers = async (id: string) => {
    try {
      const transfers = await dataService.getTransfers(parseInt(id));
      return transfers;
    } catch (error) {
      toast.error("Error fetching transfers");
      throw error; // Re-throw the error to propagate it
    }
  };

  const getBadge = async (id: string) => {
    try {
      const data = await dataService.getBadge(parseInt(id));
      console.log('====================================');
      console.log('data', data);
      console.log('====================================');
      return data;
    } catch (error) {
      toast.error("Error fetching badge");
      throw error; // Re-throw the error to propagate it
    }
  };

  // Main function to fetch and display the transfers
  const fetchAndDisplayTransfers = async () => {
    try {
      const clubId = await getClubs();
      const playerId = await getPlayers(clubId);
      const transfers = await getTransfers(playerId);

      return transfers;
    } catch (error) {
      console.error("Error fetching and displaying transfers:", error);
    }
  };

  const dataContextData: DataContextData = {
    fetchAndDisplayTransfers,
    getBadge,
  };

  return (
    <DataContext.Provider value={dataContextData}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within an DataProvider");
  }
  return context;
};

export { DataProvider, useData };
