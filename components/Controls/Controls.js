import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { sortToggle, releaseToggle } from "../../redux/actions/catalog";
import { PlatformsSort } from '../PlatformsSort/PlatformsSort';

export const Controls = () => {
  const dispatch = useDispatch();
  const { nameSort, releaseDateSort, platformsSort, isLoading } = useSelector(
    (store) => store.catalog
  );
  //console.log(nameSort, releaseDateSort, platformsSort);
  return (
    <Wrapper>
      <Button
        isActive={nameSort !== null}
        sort={nameSort}
        width="70px"
        onClick={() => dispatch(sortToggle())}
        disabled={isLoading}
      >
        Name
      </Button>
      <Button
        isActive={releaseDateSort !== null}
        sort={releaseDateSort}
        width="75px"
        onClick={() => dispatch(releaseToggle())}
        disabled={isLoading}
      >
        Release
      </Button>
      <PlatformsSort/>
    </Wrapper>
  );
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

const Button = styled.button`
  display: flex;
  outline: none;
  min-width: ${(p) => p.width};
  min-height: 35px;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.bg_card};
  color: ${(p) =>
    p.isActive ? p.theme.color_page : hexToRGBA(p.theme.color_page, 0.5)};
  border: 1px solid
    ${(p) =>
      p.isActive ? p.theme.color_page : hexToRGBA(p.theme.color_page, 0.5)};
  cursor: pointer;

  &:after {
    content: "${(p) => (p.sort === null ? "" : p.sort === true ? "↑" : "↓")}";
    font-size: 1.5rem;
    position: relative;
    top: -2px;
    right: -4px;
  }

  &:not(:last-child){
    margin-right: 10px;
  }
`;
