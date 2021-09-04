import Head from "next/head";
const Layout = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title ?? "Game test page"}</title>
        <meta name="description" content={description ?? "This is test task"} />
        <meta charSet="utf-8" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
