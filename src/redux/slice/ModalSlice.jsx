import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isLoginOpen: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openRegisterModal: (state, action) => {
      state.isOpen = true;
    },
    closeRegisterModal: (state, action) => {
      state.isOpen = false;
    },
    openLoginModal: (state, action) => {
      state.isLoginOpen = true;
    },
    closeLoginModal: (state, action) => {
      state.isLoginOpen = false;
    },
  },
});

export const {
  openRegisterModal,
  closeRegisterModal,
  openLoginModal,
  closeLoginModal,
} = ModalSlice.actions;
export default ModalSlice.reducer;
