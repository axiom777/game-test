import Layout from "../components/Layout/Layout";
import styled from "styled-components";

const PageNotFound = ({ message }) => {
  return (
    <Layout title="404 not found" description="404 not foun">
      <Message>404 not found{message && ` | ${message}`}</Message>
    </Layout>
  );
};

export default PageNotFound;

const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
`;
