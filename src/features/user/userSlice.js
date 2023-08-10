import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      email: "",
      idToken: "",
      locadId: "",
      profileImage: "",
      location: {
        latitude: "",
        longitude: "",
        address: "",
      },
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    logOut: (state) => {
      state.value = {
        email: "",
        idToken: "",
      };
    },
    setProfilePic: (state, action) => {
      state.value = {
        ...state.value,
        profileImage: action.payload,
      };
    },
    setProfileLocation: (state, action) => {
      state.value = {
        ...state.value,
        location: action.payload,
      };
    },
  },
});

export const { setUser, logOut, setProfilePic,setProfileLocation } = userSlice.actions;

export default userSlice.reducer;
