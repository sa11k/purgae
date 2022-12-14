import styled from "@/styles/theme-components";

export const RankingListItemWrapper = styled.div<{ order: number | undefined }>`
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 1.5fr 0.85fr;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white400};
  min-height: 4.5rem;
  order: ${(props) => props.order};
  @media screen and (max-width: 1350px) {
    order: 1;
  }
  @media screen and (max-width: 768px) {
    width: 20rem;
    padding: 0.5rem 1rem;
    grid-template-columns: 0.5fr 1.1fr 1fr;
    min-height: 3.5rem;
  }
`;

export const RankingListItemNickname = styled.p`
  ${({ theme }) => theme.mixins.font("1rem", "500")};
  color: ${({ theme }) => theme.colors.mainParagraph};
  text-align: left;
`;

export const RankingContentDeatilWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
  padding: 0.5rem;
  gap: 0.5rem;
`;

export const RankingProfileWrapper = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mixins.flexBox("row", "center", "start")};
  gap: 1rem;
  width: 16rem;
  @media screen and (max-width: 768px) {
    width: 8rem;
    & > p {
      ${({ theme }) => theme.mixins.font("0.6rem", "500")};
    }
    & > div {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

export const RankingListItemContent = styled.p`
  ${({ theme }) => theme.mixins.flexBox("row", "center", "center")};
  ${({ theme }) => theme.mixins.font("1rem", "500")};
  color: ${({ theme }) => theme.colors.mainParagraph};
  line-height: 1rem;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 768px) {
    ${({ theme }) => theme.mixins.font("0.6rem", "500")};
  }
  & > span {
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const RankingListItemNumber = styled.p`
  ${({ theme }) => theme.mixins.font("1rem", "700")};
  color: ${({ theme }) => theme.colors.mainParagraph};
  line-height: 1rem;
  padding: 0.5rem;
  @media screen and (max-width: 768px) {
    ${({ theme }) => theme.mixins.font("0.8rem", "700")};
  }
`;

export const RankingContentIcon = styled.span<{ color: string; size: string }>`
  font-size: ${(props) => props.size};
  margin-right: 0.8rem;
  color: ${(props) => props.color};
`;
