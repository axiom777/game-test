import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { setCatalog } from "../redux/actions/catalog";
import { setIsMobile } from "../redux/actions/config";
import Layout from "../components/Layout/Layout";
import { Catalog } from "../components/Catalog/Catalog";
import { Controls } from "../components/Controls/Controls";

function Home() {
  const dispatch = useDispatch();
  const { seo_title, games } = useSelector((store) => store.catalog);

  useEffect(() => {
    if (games === null) {
      dispatch(setCatalog());
    }
  }, [dispatch, games]);

  return (
    <Layout title={seo_title}>
      <Controls />
      {!games ? "Loading..." : <Catalog />}
    </Layout>
  );
}

Home.getInitialProps = wrapper.getInitialPageProps(
  (store) => async ({ req }) => {
    if (!req) return {};
    const isMobile = req.headers["user-agent"].match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    store.dispatch(setIsMobile(isMobile));
    await store.dispatch(setCatalog());
    return {};
  }
);

export default Home;
