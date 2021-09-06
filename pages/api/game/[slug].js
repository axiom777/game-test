const gameHandler = async (req, res) => {
  const { slug } = req.query;
  const key = process.env.API_KEY;
  const URL = `https://api.rawg.io/api/games/${slug}?key=${key}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Response not ok");
    const json = await response.json();
    res.status(200).json(json);
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: "Not Found" });
  }
};

export default gameHandler;
