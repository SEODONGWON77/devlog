import { AtomEffect, atom, selector, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// next.js에서 사용하기 위해 ssr이 끝났는지를 확인하는 state
// 새로고침 시에 항상 default값 -> false
const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
});

//useEffect에 쓰일 함수를 정의
export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

//ssrCompletedState가 완료될 때까지 기다린 후, persistAtom을 반환
export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

export const userEmailState = atom({
  key: "emailState",
  default: "",
});
export const userNameState = atom({
  key: "nameState",
  default: "",
});

export const postState = atom({
  key: "postState",
  default: {
    title: "",
    index: 0,
    htmlstr: "",
    shortcontent: "",
    name: "",
    email: "",
    taglist: "",
    updatedt: "",
    createdt: "",
    likedcounter: "",
    previewimageurl: "",
  },
  effects_UNSTABLE: [persistAtomEffect],
});

export const imageUrlListState = atom<string[]>({
  key: "imageUrlListState",
  default: [],
});
