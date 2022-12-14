import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { User } from "@/redux/types";

interface UserState {
  user: User | null;
}

// * 초기 값
const initialState: UserState = {
  user: null,
};

const slice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // * 유저 데이터를 인자로 전달 받아 Store에 저장한다.
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const selectUser = createSelector(
  (state: RootState) => state.user,
  (user) => user
);

export const { setUser, resetUser } = slice.actions;
export default slice.reducer;
