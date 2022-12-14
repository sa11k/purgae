import styled from "@/styles/theme-components";
import { MainTitle, MainTextPrimary, MainIcon, MainLink } from "../../Home.styled";
import ScrollToAppear from "@/utils/animations/ScorllToAppear";

const MoneyGoBackground = styled.div<{ animation: string; visibility: string }>`
  ${({ theme }) => theme.mixins.flexBox("column", "center", "space-between")};
  width: 100%;
  min-height: 38rem;
  padding: 4rem 1rem 1rem;
  @media screen and (min-width: 1350px) {
    padding: 4rem 6rem 1rem;
  }
  background-color: ${({ theme }) => theme.colors.transparent};
  & > * {
    visibility: ${(props) => props.visibility};
    animation: ${(props) => props.animation};
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @media screen and (max-width: 768px) {
      visibility: visible;
      animation: none;
    }
  }
`;

const MoneyGoIconWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("row", "center", "space-between")};
  width: 38rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  & > img {
    @media screen and (max-width: 768px) {
      width: 10rem;
    }
  }
`;

const MoneyGoText = styled.span`
  ${({ theme }) => theme.mixins.font("1rem", "500")};
  color: ${({ theme }) => theme.colors.gray300};
  line-height: 1.6rem;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 0.6rem;
    line-height: 1.2rem;
  }
`;

const MoneyGo = () => {
  const animation = ScrollToAppear("moneygo_animation", 2);

  return (
    <MoneyGoBackground animation={animation ? "fadein 2.5s" : "none"} visibility={animation ? "visible" : "hidden"}>
      <MainTitle mt="8rem" id="moneygo_animation">
        기부받은 돈은 어디로 가나요?
      </MainTitle>
      <MoneyGoIconWrapper>
        <MainIcon src={"/assets/MainPage/Icon/5.png"} width="14rem" />
        <MainIcon src={"/assets/MainPage/Icon/6.png"} width="14rem" />
      </MoneyGoIconWrapper>
      <MoneyGoText>
        여러분이 기부해주신 모든 금액은 <MainTextPrimary>푸르게</MainTextPrimary>의 지갑에 보관된 후,
        <br />
        일정 금액 이상이 모이면 해양환경단체에 기부됩니다.
        <br />
        블록체인 위에서 투명하게 공개되는 기부금의 흐름을 구경해 보세요.
        <br />
        <MainLink to="/faq">자주 묻는 질문</MainLink> 페이지에서 <MainTextPrimary>푸르게</MainTextPrimary>의 지갑 주소를
        확인할 수 있습니다.
      </MoneyGoText>
    </MoneyGoBackground>
  );
};

export default MoneyGo;
