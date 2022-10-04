import { Route, Routes, useLocation } from "react-router-dom";
import { Fragment, useEffect, lazy, Suspense } from "react";
import { createPortal } from "react-dom";

// * Alert
import AlertModal from "@/common/AlertModal/AlertModal";
import { useAppSelector } from "@/hooks/storeHook";
import { selectAlert } from "@/redux/slices/alertSlice";

//* Loading Modal
import LoadingModal from "@/common/LoadingModal/LoadingModal";

// * Navbar
import Navbar from "@/common/Navbar/Navbar";

// * useHook
import { useDispatch } from "react-redux";

// * slice
import { resetUser, selectUser } from "@/redux/slices/userSlice";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAlertModal } from "@/hooks/useAlertModal";
import { isEmpty, isNull } from "lodash";
import useFetchNFT from "./hooks/useFetchNFT";

//* 컴포넌트
const Login = lazy(() => import("@/features/login/Login"));
const Home = lazy(() => import("@/features/home/Home"));
const Start = lazy(() => import("@/features/start/Start"));
const Donate = lazy(() => import("@/features/donate/Donate"));
const Profile = lazy(() => import("@/features/profile/Profile"));
const Ranking = lazy(() => import("@/features/ranking/Ranking"));
const Game = lazy(() => import("@/features/game/Game"));
const ProfileAquarium = lazy(() => import("@/features/profile/ProfileAquarium"));
const Faq = lazy(() => import("@/features/faq/Faq"));
const DetailProfileCard = lazy(() => import("@/features/profile/components/DetailProfileCard/DetailProfileCard"));

declare global {
  interface Window {
    web3?: any;
  }
}
const App = () => {
  //* AlertModal Status
  const { status: alertState, content, styles } = useAppSelector(selectAlert);
  const el = document.getElementById("modal")!;

  // * react
  const dispatch = useDispatch();
  const location = useLocation();
  const currentAccount = useAppSelector((state) => state.user.user?.walletAddress);
  const [login] = useLoginMutation();

  // * web3
  const { fetchMyNFT } = useFetchNFT();

  const getHash = async (connectAddress: string[]) => {
    if (connectAddress) {
      const existHash = await fetchMyNFT(connectAddress[0]);
      if (existHash.length > 0) {
        const newExistHash = existHash.map(async (element: string) => {
          if (!isEmpty(element)) {
            const data = element.split("https://ipfs.io/ipfs/")[1];
            return data;
          } else {
            return "";
          }
        });
        return newExistHash;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  const updateUser = async (metamaskAccount: string) => {
    // *네트워크 여부 고려 안함
    if (metamaskAccount) {
      const hashData = await getHash([metamaskAccount]);
      const transHash = await Promise.all(hashData);
      const allHashdata = transHash.filter((item) => item.length > 0);
      if (!isEmpty(allHashdata)) {
        await login({ walletAddress: metamaskAccount, nft: allHashdata });
      } else {
        await login({ walletAddress: metamaskAccount });
      }
    }
    if (window.ethereum && location.pathname !== "/" && location.pathname !== "/login") {
    }
    return;
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // *메타마스크 연결 해제 시
      resetAccount();
    } else {
      // *단순 계정 변경시 혹은 로그인시
      if (currentAccount !== undefined && accounts[0] !== currentAccount) {
        // console.log("스토어에 저장된 account와, 현재 유저 불일치", "스토어:", currentAccount, "현재유저:", accounts);
        if (window.ethereum && location.pathname !== "/" && location.pathname !== "/login") {
          await updateUser(accounts[0]);
        }
      } else if (currentAccount === undefined) {
        await updateUser(accounts[0]);
      }
    }
  };
  const resetAccount = () => {
    dispatch(resetUser());
  };

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    // @접속된 유저
    if (window.ethereum && location.pathname !== "/" && location.pathname !== "/login") {
      // * window.web3 = new Web3(window.ethereum);
      const metamaskAccount = window.ethereum.selectedAddress;

      window.ethereum.on("accountsChanged", async (acc: string[]) => {
        await handleAccountsChanged(acc);
      });

      window.ethereum.on("disconnect", (acc: string[]) => {
        resetAccount();
        window.location.reload();
      });

      if (!isNull(metamaskAccount) && currentAccount === undefined) {
        updateUser(metamaskAccount);
        // console.log("자동로그인 완료-연결된 상태에서 들어옴");
      } else if (isNull(metamaskAccount) && currentAccount !== undefined) {
        resetAccount();
        // console.log("접속안된 상태이나, 스토어 있으므로 초기화");
      } else if (!isNull(metamaskAccount) && currentAccount !== undefined && metamaskAccount !== currentAccount) {
        updateUser(metamaskAccount);
        // console.log("store의 유저와 다르므로 재로그인 요청");
      }
    } else {
      // @접속안된유저
      // console.log("메타마스크 설치 안됨");
    }

    return () => {
      if (window.ethereum && location.pathname !== "/" && location.pathname !== "/login") {
        window.ethereum.on("accountsChanged", async (acc: string[]) => {
          await handleAccountsChanged(acc);
        });
        window.ethereum.on("disconnect", (acc: string[]) => {
          resetAccount();
        });
      }
    };
  }, []);

  return (
    <Fragment>
      <Suspense fallback={<LoadingModal />}>
        <Routes>
          <Route element={<Navbar />}>
            {/* 메인 페이지 */}
            <Route path="/main" element={<Home />} />
            {/* 로그인 */}
            <Route path="/login" element={<Login />} />
            {/* 개인 프로필 페이지 */}
            <Route path="/profile/:userId" element={<Profile />} />
            {/* 프로필 페이지 - 도감 상세 (id값으로 확인) */}
            <Route path="/profile/:userId/:id" element={<DetailProfileCard />} />
            {/* 게임 */}
            <Route path="/game" element={<Game />} />
            {/* 랭킹 */}
            <Route path="/ranking" element={<Ranking />} />
            {/* 기부 */}
            <Route path="/donate" element={<Donate />} />
            {/* 자주 묻는 질문 */}
            <Route path="/faq" element={<Faq />} />
            <Route path="/faq/:id" element={<Faq />} />
          </Route>
          {/* 메인 페이지 입장하기 전 수족관 */}
          <Route path="/" element={<Start />} />
          {/* 개인 수족관 */}
          <Route path="/profile/:userId/aquarium" element={<ProfileAquarium />} />
        </Routes>
      </Suspense>
      {/* 알럿 모달 */}
      {alertState &&
        createPortal(
          <AlertModal top="4rem" right="50%" styles={styles}>
            {content}
          </AlertModal>,
          el
        )}
    </Fragment>
  );
};

export default App;
