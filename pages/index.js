import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { setCatalog } from "../redux/actions/catalog";
import { setKey, setIsMobile } from "../redux/actions/config";
import Layout from "../components/Layout/Layout";
import { Card } from "../components/Card/Card";
import styled from "styled-components";
import useWindowSize from "../utils/useWindowSize";

function Home() {
  const store = useSelector((store) => store.catalog);
  const { isMobile } = useSelector((store) => store.config);
  const { results, seo_title, seo_description } = store.data;
  const { width: windowWidth } = useWindowSize();

  return (
    <Layout title={seo_title} description={seo_description}>
      <Wrapper>
        {results.map((result) => (
          <Card
            key={result.id}
            data={result}
            windowWidth={windowWidth}
            isMobile={isMobile}
          />
        ))}
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
