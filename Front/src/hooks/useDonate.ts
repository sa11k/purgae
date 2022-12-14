import useProvider from "./useProvider";
import { useMetaMask } from "metamask-react";
import { TEST_WALLET_ADDRESS } from "@/utils/smart-contract/MetaEnv";
import { useAlertModal } from "./useAlertModal";
import { useFailDonateMutation } from "@/redux/api/nftApi";
import { useAppDispatch } from "@/hooks/storeHook";
import { offModal } from "@/redux/slices/donateSlice";

const useDonate = () => {
  const { contract, changeEtherToWei, networkChainId } = useProvider();
  const { chainId, switchChain } = useMetaMask();
  const { openAlertModal } = useAlertModal();
  const [failDonate] = useFailDonateMutation();
  const dispatch = useAppDispatch();

  const donate = ({ uid, id, ether, address }: { uid: number; id: number; ether: string; address: string }) => {
    const wei = changeEtherToWei(ether);
    const transactionObject = {
      from: address,
      value: wei,
    };

    if (chainId !== networkChainId.goerli) {
      (async () => {
        try {
          await switchChain(networkChainId.goerli);
          await contract.methods.transferNFT(id, TEST_WALLET_ADDRESS, address).send(transactionObject);
          dispatch(offModal());
        } catch (error: any) {
          failDonate({ userId: uid, nftId: id });
          dispatch(offModal());
          if (error.message === "User rejected the request.") {
            const content = "네트워크 연결 요청을 거부하셨습니다.";
            openAlertModal({ content, styles: "DANGER" });
          } else {
            const content = "에러가 발생했습니다. 잠시 후에 시도해주세요.";
            openAlertModal({ content, styles: "DANGER" });
          }
        }
      })();
    } else {
      (async () => {
        try {
          await contract.methods.transferNFT(id, TEST_WALLET_ADDRESS, address).send(transactionObject);
          dispatch(offModal());
        } catch (error: any) {
          failDonate({ userId: uid, nftId: id });
          dispatch(offModal());
          if (error.message === "User rejected the request.") {
            const content = "네트워크 연결 요청을 거부하셨습니다.";
            openAlertModal({ content, styles: "DANGER" });
          } else if (error.message === "MetaMask Tx Signature: User denied transaction signature.") {
            const content = "기부를 마무리하려면 거래를 완료해주세요.";
            openAlertModal({ content, styles: "RED" });
          } else {
            const content = "에러가 발생했습니다. 잠시 후에 시도해주세요.";
            openAlertModal({ content, styles: "DANGER" });
          }
        }
      })();
    }
  };

  return donate;
};

export default useDonate;
