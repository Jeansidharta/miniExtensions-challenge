import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConfirmationResult, RecaptchaVerifier, User, linkWithPhoneNumber } from 'firebase/auth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const phoneNumberLinkVerificationCode = createAsyncThunk(
    'phoneNumberLinkVerificationCode',
    async (
        args: {
            phoneNumber: string;
            user: User;
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
            throw new Error('You must provide a captcha');
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
            const sentConfirmationCode = await linkWithPhoneNumber(
                args.user,
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
                    confirmationResult: sentConfirmationCode,
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

export const usePhoneNumberLinkVerificationCodeLoading = () => {
    const loading = useSelector(
        (state: RootState) => state.loading.phoneNumberLinkVerificationCode
    );
    return loading;
};
