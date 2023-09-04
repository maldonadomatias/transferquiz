import { styled } from "styled-components";
import TableHistory from "./TableHistory";

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 5px;
  margin-top: 10px;
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

interface Props {
  loading: boolean;
  badge: string;
  currentPlayer: any;
  guess: string;
  setGuess: (guess: string) => void;
  giveUp: boolean;
  handleGuess: () => void;
  handleFetchAndDisplayTransfers: () => void;
  handleGiveUp: () => void;
}

const Game = ({
  loading,
  badge,
  currentPlayer,
  guess,
  setGuess,
  giveUp,
  handleGuess,
  handleFetchAndDisplayTransfers,
  handleGiveUp,
}: Props) => {
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HistoryContainer>
          <img src={badge} alt="club badge" />
          {currentPlayer.history && currentPlayer.history.length > 0 ? (
            <TableHistory currentPlayer={currentPlayer} />
          ) : (
            <p>No transfer history available.</p>
          )}

          <Input
            type="text"
            placeholder="Enter player's name"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={giveUp}
          />
          {!giveUp ? (
            <Button onClick={handleGuess}>Submit Guess</Button>
          ) : (
            <Button onClick={handleFetchAndDisplayTransfers}>
              Next Player
            </Button>
          )}
          {!giveUp && <Button onClick={handleGiveUp}>Give Up</Button>}
        </HistoryContainer>
      )}
    </>
  );
};

export default Game;
