import { useLottie } from "lottie-react";
import { styled } from "styled-components";

import animationData from "../../assets/lotties/load_ball.json";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Loader = () => {
  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <LoadingContainer>{View}</LoadingContainer>;
};

export default Loader;
