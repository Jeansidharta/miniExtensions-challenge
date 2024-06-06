import { createSlice } from '@reduxjs/toolkit';
import { loginWithEmail } from '../auth/loginWithEmail';
import { verifyPhoneNumber } from '../auth/verifyPhoneNumber';
import { loginWithPhoneNumberVerificationCode } from '../auth/loginWithPhoneNumber';
import { phoneNumberLinkVerificationCode } from '../auth/phoneNumberLink';
import { sendEmailLink } from '../auth/sendEmailLink';

export interface LoadingStates {
    [key: string]: boolean;
}

const initialState: LoadingStates = {
    loginWithEmail: false,
    phoneNumberLinkVerificationCode: false,
    loginWithPhoneNumberVerificationCode: false,
    verifyPhoneNumber: false,
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginWithEmail.pending, (state) => {
            state.loginWithEmail = true;
        });
        builder.addCase(loginWithEmail.fulfilled, (state) => {
            state.loginWithEmail = false;
        });
        builder.addCase(loginWithEmail.rejected, (state) => {
            state.loginWithEmail = false;
        });
        // Link Phone Number OTP
        builder.addCase(phoneNumberLinkVerificationCode.pending, (state) => {
            state.phoneNumberLinkVerificationCode = true;
        });
        builder.addCase(phoneNumberLinkVerificationCode.fulfilled, (state) => {
            state.phoneNumberLinkVerificationCode = false;
        });
        builder.addCase(phoneNumberLinkVerificationCode.rejected, (state) => {
            state.phoneNumberLinkVerificationCode = false;
        });
        // Login Phone Number OTP
        builder.addCase(loginWithPhoneNumberVerificationCode.pending, (state) => {
            state.loginWithPhoneNumberVerificationCode = true;
        });
        builder.addCase(loginWithPhoneNumberVerificationCode.fulfilled, (state) => {
            state.loginWithPhoneNumberVerificationCode = false;
        });
        builder.addCase(loginWithPhoneNumberVerificationCode.rejected, (state) => {
            state.loginWithPhoneNumberVerificationCode = false;
        });
        // Send Email Link
        builder.addCase(sendEmailLink.pending, (state) => {
            state.sendEmailLink = true;
        });
        builder.addCase(sendEmailLink.fulfilled, (state) => {
            state.sendEmailLink = false;
        });
        builder.addCase(sendEmailLink.rejected, (state) => {
            state.sendEmailLink = false;
        });
        // Verify Phone Number
        builder.addCase(verifyPhoneNumber.pending, (state) => {
            state.verifyPhoneNumber = true;
        });
        builder.addCase(verifyPhoneNumber.fulfilled, (state) => {
            state.verifyPhoneNumber = false;
        });
        builder.addCase(verifyPhoneNumber.rejected, (state) => {
            state.verifyPhoneNumber = false;
        });
    },
});

export const loadingReducer = loadingSlice.reducer;
