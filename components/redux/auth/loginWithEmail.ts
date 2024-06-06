import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import isEmail from 'validator/lib/isEmail';
import { useAppSelector } from '../store';

export const loginWithEmail = createAsyncThunk(
    'login',
    async (
        args: {
            type: 'login' | 'sign-up';
            email: string;
            password: string;
            callback: (args: { type: 'success' | 'error' }) => void;
        },
        { dispatch }
    ) => {
        try {
            if (!isEmail(args.email)) {
                dispatch(
                    showToast({
                        message: 'Enter a valid email',
                        type: 'info',
                    })
                );
                return;
            }
            if (args.password.length < 6) {
                dispatch(
                    showToast({
                        message: 'Password should be atleast 6 characters',
                        type: 'info',
                    })
                );
                return;
            }

            if (args.type === 'sign-up') {
                await createUserWithEmailAndPassword(firebaseAuth, args.email, args.password);
            } else {
                await signInWithEmailAndPassword(firebaseAuth, args.email, args.password);
            }
            args.callback({ type: 'success' });
        } catch (e: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                    type: 'error',
                })
            );
            args.callback({ type: 'error' });
        }
    }
);

export const useIsLoginWithEmailLoading = () => {
    const loading = useAppSelector((state) => state.loading.loginWithEmail);
    return loading;
};
