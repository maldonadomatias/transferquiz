import { styled } from "styled-components";
import TableHistory from "./TableHistory";
import Loader from "./ui/Loader";

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100vh;
  padding: 0 5%;
`;

const Badge = styled.img`
  height: 15vh;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 5px;
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  font-size: 16px;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  font-family: "Dela Gothic One", cursive;
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
        <Loader />
      ) : (
        <HistoryContainer>
          <Badge src={badge} alt="club badge" />
          <Input
            type="text"
            placeholder="Ingresa el apellido del jugador"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={giveUp}
          />
          {currentPlayer.history && currentPlayer.history.length > 0 ? (
            <TableHistory currentPlayer={currentPlayer} />
          ) : (
            <p>No transfer history available.</p>
          )}
          {!giveUp ? (
            <ButtonContainer>
              <Button
                style={{
                  backgroundColor: "#dc3545",
                }}
                onClick={handleGiveUp}
              >
                Rendirse
              </Button>
              <Button
                style={{
                  backgroundColor: "var(--primary-color-variant-1)",
                }}
                onClick={handleGuess}
              >
                Adivinar
              </Button>
            </ButtonContainer>
          ) : (
            <Button
              style={{
                backgroundColor: "var(--primary-color-variant-1)",
              }}
              onClick={handleFetchAndDisplayTransfers}
            >
              Next Player
            </Button>
          )}
        </HistoryContainer>
      )}
    </>
  );
};

export default Game;
