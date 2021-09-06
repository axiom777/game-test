import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

export const Card = (props) => {
  const { data, isMobile } = props;
  const { slug, name, released, background_image, platforms, rating } = data;
  const [width, setWidth] = useState();
  const [isHovered, setHovered] = useState(false);
  const router = useRouter();
  const imageRef = useRef(null);

  useEffect(() => {
    const width = imageRef.current.clientWidth;
    setWidth(width);
  }, [imageRef]);

  const imageProps = {
    width: 600,
    height: 400,
  };
  const url = "/game/[slug]";
  const as = `/game/${slug}`;

  const image =
    background_image &&
    background_image.replace(
      "media/",
      `media/crop/${imageProps.width}/${imageProps.height}/`
    );

  return (
    <Wrapper
      ref={imageRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      isHovered={isHovered}
      onClick={() => router.push(url, as)}
    >
      <ImageWrapper width={width}>
        {background_image && (
          <Image src={image} alt={name} {...imageProps} layout="responsive" />
        )}
      </ImageWrapper>
      <Content>
        <Name>
          <Link href={url} as={as}>
            <a>{name}</a>
          </Link>
        </Name>
        {(isHovered || isMobile) && (
          <Details isMobile={isMobile}>
            <Detail>
              <DetailName>Rating:</DetailName>
              <DetailValue>{rating}</DetailValue>
            </Detail>
            <Detail>
              <DetailName>Released:</DetailName>
              <DetailValue>{released}</DetailValue>
            </Detail>
          </Details>
        )}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: ${(props) => props.theme.bg_card};
  margin: 10px;
  user-select: none;
  cursor: pointer;
  border-radius: ${(props) => props.theme.border_radius};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  @media(min-width: 600px){
    max-width: calc(-20px + 100% / 2);
  }
  @media(min-width: 1200px){
    max-width: calc(-20px + 100% / 3);
  }
  @media(min-width: 1800px){
    max-width: calc(-20px + 100% / 4);
  }

  ${(props) => (props.isHovered ? "z-index: 1;" : "")}
  ${(props) => (props.isHovered ? "border-bottom-left-radius: 0;" : "")}
  ${(props) => (props.isHovered ? "border-bottom-right-radius: 0;" : "")}
  ${(props) => (props.isHovered ? "transform: scale(1.05);" : "")}
`;

const ImageWrapper = styled.div`
  height: calc(${(p) => p.width}px / 1.5);
  overflow: hidden;
  border-top-left-radius: ${(props) => props.theme.border_radius};
  border-top-right-radius: ${(props) => props.theme.border_radius};
`;

const Content = styled.div`
  padding: 10px;
  margin-top: auto;
`;

const Name = styled.h2`
  padding: 10px;
  margin: 0;
  & > a {
    color: ${(p) => p.theme.color_page};
    text-decoration: none;
  }
`;

const Details = styled.ul`
  margin: 0;
  padding: 10px 20px;
  ${(props) =>
    props.isMobile
      ? "position: relative;"
      : `
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding-bottom: 20px;`}
  
  border-bottom-left-radius: ${(props) => props.theme.border_radius};
  border-bottom-right-radius: ${(props) => props.theme.border_radius};
  background: ${(props) => props.theme.bg_card};
  list-style-type: none;
  font-size: 0.8rem;
`;

const Detail = styled.li`
  margin-top: 5px;
  display: flex;
`;

const DetailName = styled.span`
  margin-right: auto;
`;

const DetailValue = styled.span``;
