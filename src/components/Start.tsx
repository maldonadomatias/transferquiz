import styled from "styled-components";
import { VscDebugStart } from "react-icons/vsc";

import { IMAGE_PATHS } from "../constants/imagePaths";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100dvh;
  width: 100%;
  padding: 3% 0;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: "Dela Gothic One", cursive;
  text-transform: uppercase;

  h1 {
    font-size: 3rem;
    color: var(--primary-color);
  }

  h3 {
    font-size: 1.5rem;
    color: var(--white-color);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 1.75rem;
    }
  }
`;

const LogoImage = styled.img`
  height: 45dvh;
  max-width: 400px;
  margin: 0 auto;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 80%;
  margin: 0 auto;
  max-width: 400px;
  aspect-ratio: 1/0.5;
  background-color: var(--white-color);
  box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(26.5px);
  border-radius: 10px;
  border: none;
  text-align: center;

  h3 {
    color: var(--primary-color);
    text-transform: uppercase;
    font-weight: 600;
    font-family: "Dela Gothic One", cursive;
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: -25px; /* Ajusta la distancia hacia abajo que desees */
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 10px;
  background-color: var(--primary-color);
  box-shadow: 0px 4px 32px 0px var(--primary-color-variant-2);
  color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  &:active {
    transform: translateX(-50%) scale(0.9);
  }
`;

interface Props {
  startGame: () => void;
}

const Start = ({ startGame }: Props) => {
  return (
    <Container>
      <Title>
        <h1>TransferQuiz</h1>
        <h3>Liga Argentina</h3>
      </Title>
      <LogoImage src={IMAGE_PATHS.LOGO_BLUE} alt="logo" />
      <Card>
        <h3>Bienvenido</h3>
        <p className="p3">
          Haz click para comenzar. Tienes 10 segundos para adivinar el nombre
          del jugador.
        </p>
        <Button onClick={startGame}>
          <VscDebugStart />
        </Button>
      </Card>
    </Container>
  );
};

export default Start;
