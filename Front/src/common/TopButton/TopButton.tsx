import { useState, useEffect } from "react";
import styled from "@/styles/theme-components";

const TopButtonStyled = styled.button`
  position: fixed;
  bottom: 3.5rem;
  right: 3.5rem;
  z-index: -10;
  width: 4.5rem;
  height: 4.5rem;
  border: 2px solid ${({ theme }) => theme.colors.white300};
  border-radius: 100%;
  opacity: 0;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.mixins.font("2rem", "700")};
  color: ${({ theme }) => theme.colors.white300};
  box-shadow: ${({ theme }) => theme.shadows.shadow600};
  cursor: pointer;
  transition: all 0.4s linear;
  &.active {
    z-index: 10;
    opacity: 1;
  }
  &:hover,
  &:focus,
  &:active {
    outline: 0 none;
  }
`;
const TopButton = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [ButtonStatus, setButtonStatus] = useState(false); // 버튼 상태

  const onToggleTopButton = () => {
    setScrollY(window.pageYOffset);
    ScrollY > 100 ? setButtonStatus(true) : setButtonStatus(false);
  };

  const onHandleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", onToggleTopButton);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", onToggleTopButton);
    };
  });

  return (
    <div>
      <TopButtonStyled
        className={ButtonStatus ? "active" : ""} // 버튼 노출 여부
        onClick={onHandleTop} // 버튼 클릭시 함수 호출
      >
        <div className="material-icons">expand_less</div>
      </TopButtonStyled>
    </div>
  );
};

export default TopButton;
