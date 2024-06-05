import { useCallback, useState } from 'react';

import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';

import { loginWithEmail, useIsLoginWithEmailLoading } from '@/components/redux/auth/loginWithEmail';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../redux/store';
import { useAuth } from '../useAuth';
import Spinner from '../Spinner';
import { LoadingStateTypes } from '../redux/types';

interface LoginFormWithEmailProps { }

export const LoginFormWithEmail = ({ }: LoginFormWithEmailProps) => {
    const auth = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useIsLoginWithEmailLoading();

    const disableSubmit = Boolean(email && password.length < 6);

    // Signing in with email and password and redirecting to home page
    const signInWithEmail = useCallback(async () => {
        await dispatch(
            loginWithEmail({
                type: 'login',
                email,
                password,
            })
        );
    }, [email, password, dispatch]);

    if (auth.type === LoadingStateTypes.LOADING) {
        return <Spinner />;
    } else if (auth.type === LoadingStateTypes.LOADED) {
        router.push('/');
        return <Spinner />;
    }

    return (
        <form
            className="flex gap-4 flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                signInWithEmail();
            }}
        >
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                type="text"
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                type="password"
            />
            <LoadingButton onClick={signInWithEmail} disabled={disableSubmit} loading={isLoading}>
                Sign In
            </LoadingButton>
        </form>
    );
};
