import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { useState } from "react";
import { search } from "../../redux/actions/catalog";

export const Search = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.catalog);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(searchQuery);

  const handleSend = () => {
    if (searchQuery !== value) {
      dispatch(search(value));
    }
  };
  const handleKeyPress = (e) => {
    e.code === "Enter" && dispatch(search(value));
  };
  return (
    <Wrapper>
      <Input
        placeholder="Search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        focused={focused}
        disabled={searchQuery === value}
        onClick={handleSend}
      >
        🔍
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: inherit;
  padding: 0 25px 0 5px;
  background: ${(p) => p.theme.bg_card};
  color: ${(p) => hexToRGBA(p.theme.color_page, 0.8)};
  border: 1px solid ${(p) => hexToRGBA(p.theme.color_page, 0.5)};
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    color: ${(p) => p.theme.bg_card};
    background: ${(p) => p.theme.color_page};
  }
`;

const Button = styled.button`
  position: absolute;
  color: ${(p) => (p.focused ? p.theme.bg_card : p.theme.color_page)};
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  &:disabled {
    cursor: default;
    color: ${(p) =>
      p.focused
        ? hexToRGBA(p.theme.bg_card, 0.5)
        : hexToRGBA(p.theme.color_page, 0.5)};
  }
`;
