import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import isEmail from 'validator/lib/isEmail';
import { useAppSelector } from '../store';

export const sendEmailLink = createAsyncThunk(
    'sendEmailLink',
    async (email: string, { dispatch }) => {
        try {
            if (!isEmail(email)) {
                dispatch(
                    showToast({
                        message: 'Enter a valid email',
                        type: 'info',
                    })
                );
                return;
            }

            await sendSignInLinkToEmail(firebaseAuth, email, {
                url: 'http://localhost:3000/linkEmail',
                handleCodeInApp: true,
            });

            localStorage.setItem('sign-in-email', email);
        } catch (e: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                    type: 'error',
                })
            );
        }
    }
);

export const useIsSendEmailLinkLoading = () => {
    const loading = useAppSelector((state) => state.loading.sendEmailLink);
    return loading;
};
