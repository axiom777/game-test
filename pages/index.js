import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { setKey, setCatalog } from "../redux/actions/catalog";

function Home(props) {
  const store = useSelector((store) => store.catalog);

  return (
    <>
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(setKey(process.env.API_KEY));
  await store.dispatch(setCatalog());
  const catalog = store.getState();
  return { props: { catalog } };
});

export default Home;
