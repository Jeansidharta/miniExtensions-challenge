import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConfirmationResult } from 'firebase/auth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const verifyPhoneNumber = createAsyncThunk(
    'verifyPhoneNumber',
    async (
        args: {
            OTPCode: string;
            confirmationResult: ConfirmationResult;
            callback: (
                args:
                    | { type: 'success' }
                    | {
                        type: 'error';
                        message: string;
                    }
            ) => void;
        },
        { dispatch }
    ) => {
        try {
            await args.confirmationResult.confirm(args.OTPCode);

            dispatch(
                showToast({
                    message: 'Logged in Successfully',
                    type: 'success',
                })
            );

            args.callback({ type: 'success' });
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

export const useVerifyPhoneNumberLoading = () => {
    const loading = useSelector((state: RootState) => state.loading.verifyPhoneNumber);
    return loading;
};
