import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { wrapper } from "../../redux/store";
import PageNotFound from "../404";
import { setIsMobile } from "../../redux/actions/config";
import { getGame } from "../../utils/getGame";
import { useRouter } from "next/router";

function Game(props) {
  const [game, setGame] = useState(props.game);
  const router = useRouter();

  useEffect(() => {
    if (!game) {
      (async () => {
        try {
          const game = await getGame(router.query.slug);
          setGame(game);
        } catch (e) {
          const { message: error } = e;
          setGame(error);
        }
      })();
    }
  }, [game,router.query.slug]);

  if (props.error) return <PageNotFound message={props.error} />;
  if (game?.error) return <PageNotFound message={game.error} />;
  return (
    <Layout>
      {!game ? <>Loading...</> : <pre>{JSON.stringify(game, null, 2)}</pre>}
    </Layout>
  );
}

Game.getInitialProps = wrapper.getInitialPageProps(
  (store) => async ({ req, query, res }) => {
    if (!req) return {};
    const isMobile = req.headers["user-agent"].match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    store.dispatch(setIsMobile(isMobile));
    const { slug } = query;
    try {
      const game = await getGame(slug);
      return { game };
    } catch (e) {
      const { message: error } = e;
      res.statusCode = 404;
      return { error };
    }
  }
);
export default Game;
