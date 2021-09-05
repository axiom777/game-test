import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { setCatalog, getNewPage } from "../redux/actions/catalog";
import { setKey, setIsMobile } from "../redux/actions/config";
import Layout from "../components/Layout/Layout";
import { Card } from "../components/Card/Card";
import styled from "styled-components";
import useWindowSize from "../utils/useWindowSize";
import { useInView } from "react-intersection-observer";

function Home() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.catalog);
  const { isLoading, games } = store;
  const { isMobile } = useSelector((store) => store.config);
  const { seo_title, seo_description, next } = store.data;
  const { width: windowWidth } = useWindowSize();

  const [inViewRef, inView] = useInView();
  useEffect(() => {
    if (inView && !isMobile) {
      dispatch(getNewPage());
    }
  }, [dispatch, inView, isMobile]);

  return (
    <Layout title={seo_title} description={seo_description}>
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
    </Layout>
  );
}

Home.getInitialProps = wrapper.getInitialPageProps(
  (store) => async ({ req }) => {
    const isMobile = req.headers["user-agent"].match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    store.dispatch(setKey(process.env.API_KEY));
    store.dispatch(setIsMobile(isMobile));
    await store.dispatch(setCatalog());
    return {};
  }
);

export default Home;

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
