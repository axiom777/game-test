import Head from "next/head";
import { GlobalStyle } from "../../styled/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../styled/theme";

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title ?? "Game test page"}</title>
        <meta name="description" content={description ?? "This is test task"} />
        <meta charSet="utf-8" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main>{children}</Main>
      </ThemeProvider>
    </>
  );
};

const Main = styled.main`
  padding: 0 20px;
`;

export default Layout;
