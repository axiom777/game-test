import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { setCatalog } from "../redux/actions/catalog";
import { setKey,setIsMobile } from "../redux/actions/config";
import Layout from "../components/Layout/Layout";

function Home() {
  //const dispatch = useDispatch();
  const store = useSelector((store) => store.catalog);
  const { seo_title, seo_description } = store.data;

  return (
    <Layout title={seo_title} description={seo_description}>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </Layout>
  );
}

Home.getInitialProps = wrapper.getInitialPageProps(
  (store) => async ({ req }) => {
    const isMobile = req.headers["user-agent"].match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    store.dispatch(setKey(process.env.API_KEY));
    store.dispatch(setIsMobile(isMobile))
    await store.dispatch(setCatalog());
    return {};
  }
);

export default Home;
