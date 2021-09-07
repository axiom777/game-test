import Image from "next/image";
import Link from "next/link";
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
      <Bread>
        <Link href={"/"}>
          <a>Главная</a>
        </Link>
        <span> {">"} {name}</span>
      </Bread>
      <ImageWrapper>
        {background_image && (
          <Image src={background_image} layout="fill" alt={name} />
        )}
      </ImageWrapper>
      {background_image && (
        <Gallery screenshots={{ ...screenshots, background_image }} />
      )}

      <H1>{name}</H1>
      <Content>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Info>
          <InfoItem>Rating: {rating}</InfoItem>
          {platforms && (
            <InfoItem>
              Platforms:
              <Info>
                {platforms.map(({ platform }) => (
                  <InfoItem key={platform.id}>{platform.name}</InfoItem>
                ))}
              </Info>
            </InfoItem>
          )}
        </Info>
      </Content>
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
const H1 = styled.h1`
  padding-left: 20px;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 20px;
  background: ${(p) => hexToRGBA(p.theme.bg_card, 0.8)};
`;
const Description = styled.div``;

const Info = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  & > li > ul {
    padding: 0 30px;
    list-style-type: circle;
  }
`;
const InfoItem = styled.li``;

const Bread = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  color: ${(p) => hexToRGBA(p.theme.color_page, 0.8)};
  & > a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: ${(p) => p.theme.color_page};
    }
  }
`;
