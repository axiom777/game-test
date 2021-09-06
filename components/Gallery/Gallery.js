import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import styled from "styled-components";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { cropImageLink } from "../../utils/cropImageLink";
import useWindowSize from "../../utils/useWindowSize";

export const Gallery = ({ screenshots }) => {
  const { isMobile } = useSelector((store) => store.config);
  const windowSize = useWindowSize();
  const imageRef = useRef(null);
  const { background_image, results } = screenshots;
  const images = [background_image, ...results.map((el) => el.image)];
  const [activeImage, setActiveImage] = useState(0);
  const [height, setHeight] = useState();

  useEffect(() => {
    setHeight(imageRef.current.clientHeight);
  }, [windowSize.width]);

  console.log(height);
  if (images.length == 0) return <></>;
  return (
    <GalleryWrapper>
      <BigImageWrapper ref={imageRef}>
        <Image
          src={
            isMobile ? cropImageLink(images[activeImage]) : images[activeImage]
          }
          layout="responsive"
          alt="gallery"
          width={1920}
          height={1080}
        />
      </BigImageWrapper>
      <GalleryList height={height}>
        {images.map((el, i) => (
          <SmallImageWrapper key={el} onClick={() => setActiveImage(i)}>
            <Image
              src={cropImageLink(el)}
              layout="responsive"
              alt="thumb"
              width={600}
              height={400}
            />
          </SmallImageWrapper>
        ))}
      </GalleryList>
    </GalleryWrapper>
  );
};

const GalleryWrapper = styled.div`
  display: flex;
  flex-gap: 10px;
  margin-top: 20px;
`;
const BigImageWrapper = styled.div`
  width: 80%;
  background: ${(p) => hexToRGBA(p.theme.bg_card, 0.8)};
  height: 100%;
  margin-right: 10px;
  & img {
    object-fit: cover;
  }
`;
const GalleryList = styled.div`
  background: ${(p) => hexToRGBA(p.theme.bg_card, 0.8)};
  width: 20%;
  height: ${(p) => `${p.height}px` ?? "200px"};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const SmallImageWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
