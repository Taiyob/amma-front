import {createSlice} from '@reduxjs/toolkit';

export type TUser = {
  id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  lastActivity: null | number;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  lastActivity: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log(action);
      const {user, token} = action.payload;
      state.user = user;
      state.token = token;
      state.lastActivity = Date.now();
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.lastActivity = null;
    },
    setLastActivity: (state, action) => {
      state.lastActivity = action.payload;
    },
  },
});

export const {setUser, logout, setLastActivity} = authSlice.actions;
export default authSlice.reducer;

// const token = useAppSelector((state) => state.auth.token);
// const user = useAppSelector((state) => state.auth.user);

//  const onFinish = async (data: TLogin) => {
//     const toastId = toast.loading('Logging in...');
//     setLoading(true);

//     try {
//       const result = await login(data).unwrap();
//       const user = verifyToken(result.data.accessToken) as TUser;

//       dispatch(setUser({user, token: result.data.accessToken}));
//       toast.success('Login successful', {id: toastId});

//       if (result.data.needsPasswordChange) {
//         navigate(`/${user.role}/change-password`);
//       } else {
//         navigate(`/${user.role}/dashboard`);
//       }
//     } catch (error: unknown) {
//       setLoading(false);
//       const err = error as TError;
//       toast.error('Login failed', {
//         id: toastId,
//         description: err?.data?.message || 'Something went wrong!',
//       });
//     }
//   };
