import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Card } from "../Card/Card";
import useWindowSize from "../../utils/useWindowSize";
import { getNewPage } from "../../redux/actions/catalog";

export const Catalog = () => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((store) => store.config);
  const { games, next, isLoading } = useSelector((store) => store.catalog);
  const { width: windowWidth } = useWindowSize();
  const [inViewRef, inView] = useInView();

  useEffect(() => {
    if (inView && !isMobile) {
      dispatch(getNewPage());
    }
  }, [dispatch, inView, isMobile]);

  return (
    <Wrapper>
      {games.map((game) => (
        <Card
          key={game.id}
          data={game}
          windowWidth={windowWidth}
          isMobile={isMobile}
        />
      ))}
      {!!next && (
        <IntersectionBlock
          ref={inViewRef}
          disabled={isLoading}
          onClick={() => dispatch(getNewPage())}
        >
          {isLoading ? "Loading..." : "More games"}
        </IntersectionBlock>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
`;

const IntersectionBlock = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  color: ${(p) => p.theme.color_page};
  background: ${(p) => p.theme.bg_card};
  border: 1px solid ${(p) => p.theme.color_page};
`;
