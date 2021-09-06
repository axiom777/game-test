import Image from "next/image";
import styled from "styled-components";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { Gallery } from "../Gallery/Gallery";
export const Game = ({ game }) => {
  const {
    name,
    description,
    rating,
    platforms,
    screenshots,
    background_image,
  } = game;
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={background_image} layout="fill" alt={name} />
      </ImageWrapper>
      <Gallery screenshots={{ ...screenshots, background_image }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  height: 100vh;
  & img {
    object-fit: cover;
    object-position: 50% top;
    z-index: -2;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      to bottom,
      ${(props) => hexToRGBA(props.theme.bg_page, 0.8)} 0%,
      ${(props) => hexToRGBA(props.theme.bg_page, 1)} 100%
    );
  }
`;
