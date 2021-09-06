import styled from "styled-components";
import { hexToRGBA } from "../../utils/hexToRGBA";

export const Controls = () => {
  return <Wrapper>Controls</Wrapper>;
};
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  margin: 0 -20px 10px;
  width: calc(100% + 20px);
  background: ${(p) => p.theme.bg_card};
  box-shadow: 0 0 10px ${(p) => hexToRGBA(p.theme.color_page, 0.2)};
`;
