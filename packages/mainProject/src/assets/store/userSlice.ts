import { createSlice } from '@reduxjs/toolkit';
import { IinitialStateUser } from '../types/types';

const initialState: IinitialStateUser = {
  id: null,
  name: null,
  pasword: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: any, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.pasword = action.payload.password;
    },

    removeUser(state) {
      state.id = null;
      state.name = null;
      state.pasword = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
