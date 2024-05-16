import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from '@/utils/axios';

export interface AuthData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AutLoginData {
  email: string;
  password: string;
}

interface User {
  token: string;
}

interface ErrorResponse {
  message: string[];
}

export const signInFunc = createAsyncThunk<
  User,
  AutLoginData,
  { rejectValue: ErrorResponse }
>('auth/signInFunc', async (authData, { rejectWithValue }) => {
  try {
    const res = await axios.post<User>('auth/login', authData);
    console.log('SIGN IN RESPONSE:', res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message,
    });
  }
});

export const signUpFunc = createAsyncThunk<
  User,
  AuthData,
  { rejectValue: ErrorResponse }
>('auth/signUpFunc', async (authData, { rejectWithValue }) => {
  try {
    const res = await axios.post<User>('auth/signup', authData);
    console.log('SIGN IN RESPONSE:', res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message,
    });
  }
});

interface AuthState {
  isLoading: boolean;
  errors: string[];
  user: User | null;
}

const initialState: AuthState = {
  isLoading: false,
  errors: [],
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errors = action.payload;
    },
    clearError: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInFunc.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(signInFunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('hasToken', String(true));
      })
      .addCase(signInFunc.rejected, (state, action) => {
        state.isLoading = false;

        state.errors = action.payload?.message
          ? action.payload.message
          : ['Unknown error occurred'];
      })
      .addCase(signUpFunc.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(signUpFunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('hasToken', String(true));
      })
      .addCase(signUpFunc.rejected, (state, action) => {
        state.isLoading = false;

        state.errors = action.payload?.message
          ? action.payload.message
          : ['Unknown error occurred'];
      });
  },
});

export const { setError, clearError } = authSlice.actions;

export default authSlice.reducer;
