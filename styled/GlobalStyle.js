import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.bg_page}; 
    color: ${(props) => props.theme.color_page};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
    margin: 0;
    padding: 0;
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
}
`;
