import {
  StartPurgaeBackground,
  StartPurgaeMenuBox,
  StartPurgaeContentBox,
  StartPurgaeTitle,
  StartPurgaeMenu,
} from "./StartPurgae.styled";
import { startPurgaeMenuTitle } from "../../FaqContents";
import { useNavigate } from "react-router-dom";
import MakeWallet from "./StartPurgaeContents/MakeWallet";
import BackButton from "../BackButton/BackButton";

type Id = {
  id: number;
};

const StartPurgae = (id: Id) => {
  const navigate = useNavigate();
  const contentNum = id.id;
  return (
    <>
      <StartPurgaeBackground>
        <StartPurgaeMenuBox>
          <StartPurgaeTitle>푸르게 시작하기</StartPurgaeTitle>
          {startPurgaeMenuTitle.map((title, index) => (
            <StartPurgaeMenu key={index} onClick={() => navigate(`/faq/${index}`)}>
              {title}
            </StartPurgaeMenu>
          ))}
        </StartPurgaeMenuBox>
        <StartPurgaeContentBox>
          <StartPurgaeTitle>{startPurgaeMenuTitle[contentNum]}</StartPurgaeTitle>
          {contentNum === 0 ? <MakeWallet /> : <div>2번</div>}
        </StartPurgaeContentBox>
      </StartPurgaeBackground>
      <BackButton />
    </>
  );
};

export default StartPurgae;
