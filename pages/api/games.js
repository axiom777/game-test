const gamesHandler = async (req, res) => {
  const { query } = req;
  const host = req.headers.host;
  const clonedQuery = { ...query };

  const key = process.env.API_KEY;
  query.key = key;

  const params = Object.keys(query).map((key) => `${key}=${query[key]}`);

  const URL = `https://api.rawg.io/api/games?${params.join("&")}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Response not ok");
    const json = await response.json();
    const { next, results: games, seo_title } = json;
    if (next !== null) {
      if (!clonedQuery.hasOwnProperty("page")) {
        clonedQuery.page = 2;
      } else {
        clonedQuery.page = parseInt(clonedQuery.page) + 1;
      }
    } else {
      clonedQuery.page = null;
    }
    const params = Object.keys(clonedQuery).map(
      (key) => `${key}=${clonedQuery[key]}`
    );
    const nextPage = `http://${host}/api/games?${params.join("&")}`;

    res.status(200).json({ games, seo_title, next: nextPage });
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: "Not Found" });
  }
};

export default gamesHandler;
