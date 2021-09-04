export default function Home() {
  return <></>;
}

export async function getStaticProps() {
  const api_key = process.env.API_KEY ?? null;
  !api_key && console.error("No API_KEY in enviroment");
  return { props: { api_key } };
}
