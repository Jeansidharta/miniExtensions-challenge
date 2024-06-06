import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const loginWithPhoneNumberVerificationCode = createAsyncThunk(
    'loginWithPhoneNumberVerificationCode',
    async (
        args: {
            phoneNumber: string;
            recaptcha: RecaptchaVerifier | null;
            callback: (
                args:
                    | { type: 'success'; confirmationResult: ConfirmationResult }
                    | {
                        type: 'error';
                        message: string;
                    }
            ) => void;
        },
        { dispatch }
    ) => {
        if (!args.recaptcha) {
            // This is a bug, and therefore should throw
            throw new Error('Provide a captcha');
        }
        if (args.phoneNumber.slice() === '' || args.phoneNumber.length < 10) {
            dispatch(
                showToast({
                    message: 'Enter the Phone Number and provide the country code',
                    type: 'info',
                })
            );
            return;
        }

        try {
            const confirmationResult = await signInWithPhoneNumber(
                firebaseAuth,
                args.phoneNumber,
                args.recaptcha
            );
            dispatch(
                showToast({
                    message: 'Verification Code has been sent to your Phone',
                    type: 'success',
                })
            );

            if (args.callback)
                args.callback({
                    type: 'success',
                    confirmationResult,
                });
        } catch (error: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(error.code),
                    type: 'error',
                })
            );
            if (args.callback)
                args.callback({
                    type: 'error',
                    message: getFriendlyMessageFromFirebaseErrorCode(error.code),
                });
        }
    }
);

export const useLoginWithPhoneNumberVerificationCodeLoading = () => {
    const loading = useSelector(
        (state: RootState) => state.loading.loginWithPhoneNumberVerificationCode
    );
    return loading;
};
