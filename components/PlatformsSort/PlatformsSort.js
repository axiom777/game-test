import { useState, useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { platformsToggle } from "../../redux/actions/catalog";

export const PlatformsSort = () => {
  const dispatch = useDispatch();
  const { platformsSort } = useSelector((store) => store.catalog);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const activePlatformsArr = Object.keys(platformsSort).reduce((acc, key) => {
    const item = platformsSort[key];
    item.active && acc.push(item.name);
    return acc;
  }, []);

  return (
    <Wrapper ref={ref}>
      <PlatformInput isActive={active} onClick={() => setActive(!active)}>
        {activePlatformsArr.length > 0
          ? activePlatformsArr.join(", ")
          : "No platforms selected."}
      </PlatformInput>
      {active && (
        <PlatformsList>
          {Object.keys(platformsSort).map((key) => (
            <Platform
              onClick={() => dispatch(platformsToggle(key))}
              key={key}
              isActive={platformsSort[key].active}
            >
              {platformsSort[key].name}
            </Platform>
          ))}
        </PlatformsList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  font-size: 0.85rem;
  width: 150px;
`;
const PlatformInput = styled.div`
  display: block;
  cursor: pointer;
  box-sizing: border-box;
  padding: 9px 5px;
  background: ${(p) => p.theme.bg_card};
  background: ${(p) => p.theme.bg_card};
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${(p) =>
    p.isActive ? p.theme.color_page : hexToRGBA(p.theme.color_page, 0.5)};
  border: 1px solid
    ${(p) =>
      p.isActive ? p.theme.color_page : hexToRGBA(p.theme.color_page, 0.5)};
`;
const PlatformsList = styled.ul`
  position: absolute;
  box-sizing: border-box;
  top: 100%;
  left: 0;
  padding: 10px 15px;
  margin: 0;
  min-width: 100%;
  list-style-type: none;
  background: ${(p) => p.theme.bg_card};
  border: 1px solid ${(p) => p.theme.color_page};
  border-top: none;
  z-index: 3;
`;
const Platform = styled.li`
  padding: 5px;
  cursor: pointer;
  user-select: none;
  color: ${(p) =>
    p.isActive ? p.theme.color_page : hexToRGBA(p.theme.color_page, 0.5)};
  &:hover{
    color: ${p=>p.isActive?"darkred":"red"};

  }
`;
