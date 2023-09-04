import { useState } from "react";
import { styled } from "styled-components";
import { toast } from "react-hot-toast";

import { Transfer } from "./interfaces/transfers";
import { useData } from "./context/data-context";
import Game from "./components/Game";

// Define styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  width: 100%;
`;

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #888;
`;

const ScoreText = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  font-size: 16px;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

function App() {
  const { fetchAndDisplayTransfers, getBadge } = useData();

  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Transfer | undefined>(
    {} as Transfer
  );
  console.log("currentPlayer", currentPlayer);
  const [badge, setBadge] = useState<string>("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);

  const handleGuess = () => {
    const guessLowercase = guess.toLowerCase();
    const playerNameLowercase = currentPlayer?.name.toLowerCase();

    // Function to remove diacritics from a string
    const removeDiacritics = (str: string | undefined) => {
      return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    if (
      removeDiacritics(guessLowercase) === removeDiacritics(playerNameLowercase)
    ) {
      // Correct guess, increase score
      setScore(score + 1);
      toast.success("Correct guess!");
      handleFetchAndDisplayTransfers();
    } else {
      // Clear the input field
      setGuess("");
      toast.error("Wrong guess, try again!");
    }
  };

  // Function to fetch and display transfers for the current player
  const handleFetchAndDisplayTransfers = async () => {
    setLoading(true);
    setGiveUp(false);
    try {
      const currentPlayer = await fetchAndDisplayTransfers();
      if (currentPlayer?.history?.length === 0) {
        handleFetchAndDisplayTransfers();
      }
      if (!currentPlayer?.history) return;
      const badge = await getBadge(currentPlayer?.history[0].newClubID);
      setBadge(badge);
      setCurrentPlayer(currentPlayer);
    } catch (error) {
      console.error("Error fetching and displaying transfers:", error);
    } finally {
      setGuess("");
      setLoading(false);
    }
  };

  const handleGiveUp = () => {
    setGiveUp(true);
    toast.error(`The player's name is ${currentPlayer?.name}`);
  };

  const startGame = () => {
    setGameStarted(true);
    handleFetchAndDisplayTransfers();
  };

  const gameProps = {
    loading,
    badge,
    currentPlayer,
    guess,
    setGuess,
    giveUp,
    handleGuess,
    handleFetchAndDisplayTransfers,
    handleGiveUp,
  };

  return (
    <Container>
      <ScoreText>Score: {score}</ScoreText>
      {!gameStarted ? (
        <div>
          <p>Click the "Start" button to begin the game!</p>
          <Button onClick={startGame}>Start</Button>
        </div>
      ) : (
        <>
          {currentPlayer ? (
            <Game {...gameProps} />
          ) : (
            <LoadingMessage>Loading player data...</LoadingMessage>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
