import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Clubs, Transfer } from "../interfaces/transfers";
import dataService from "./DataService";

interface DataContextData {
  fetchAndDisplayTransfers: () => Promise<Transfer | undefined>;
  getBadge: (id: string) => Promise<string>;
  loadingClubs?: boolean;
}

const DataContext = createContext<DataContextData | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [clubs, setClubs] = useState<Clubs | undefined>({} as Clubs);
  const [loadingClubs, setLoadingClubs] = useState<boolean>(false);

  const getClubs = async () => {
    setLoadingClubs(true);
    try {
      const clubs = await dataService.getClubs();
      setClubs(clubs);
    } catch (error) {
      toast.error("Error fetching clubs");
      throw error; // Re-throw the error to propagate it
    } finally {
      setLoadingClubs(false);
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
      return data;
    } catch (error) {
      toast.error("Error fetching badge");
      throw error; // Re-throw the error to propagate it
    }
  };

  // Main function to fetch and display the transfers
  const fetchAndDisplayTransfers = async () => {
    try {
      if (clubs) {
        const randomIndex = Math.floor(Math.random() * clubs.clubs.length);
        const clubId = clubs.clubs[randomIndex].id;
        const playerId = await getPlayers(clubId);
        const transfers = await getTransfers(playerId);
        return transfers;
      }
    } catch (error) {
      console.error("Error fetching and displaying transfers:", error);
    }
  };

  const dataContextData: DataContextData = {
    fetchAndDisplayTransfers,
    getBadge,
    loadingClubs,
  };

  useEffect(() => {
    getClubs();
  }, []);

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
