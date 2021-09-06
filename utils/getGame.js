export const getGame = async (slug) => {
    const url = `http://localhost:3000/api/game/${slug}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error from server Response");
    const json = await response.json();
    return { ...json }
};
