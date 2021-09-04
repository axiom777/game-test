import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { setKey, setCatalog } from "../redux/actions/catalog";
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

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(setKey(process.env.API_KEY));
  await store.dispatch(setCatalog());
  const catalog = store.getState();
  return { props: { catalog } };
});

export default Home;
