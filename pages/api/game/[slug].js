const gameHandler = async (req, res) => {
  const { slug } = req.query;
  const key = process.env.API_KEY;
  const URL = `https://api.rawg.io/api/games/${slug}?key=${key}`;
  const URL_SCREENSHOTS = `https://api.rawg.io/api/games/${slug}/screenshots?key=${key}`;

  try {
    const [respGame, respScreenshot] = await Promise.all([
      fetch(URL),
      fetch(URL_SCREENSHOTS),
    ]);
    if (!respGame.ok) throw new Error("Response not ok");
    const [jsonGame, jsonScreenshot] = await Promise.all([
      respGame.json(),
      respScreenshot.json(),
    ]);

    res.status(200).json({ ...jsonGame, screenshots: jsonScreenshot });
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: "Not Found" });
  }
};

export default gameHandler;
