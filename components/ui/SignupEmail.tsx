import { useRouter } from 'next/router';
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';
import { useAppDispatch } from '../redux/store';
import { FormEmail } from './FormEmail';
import { useCallback } from 'react';

export const SignupEmail = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoading = useIsLoginWithEmailLoading();

    const handleSubmit = useCallback(
        (email: string, password: string) => {
            dispatch(
                loginWithEmail({
                    type: 'sign-up',
                    email,
                    password,
                    callback: (response) => {
                        if (response.type === 'error') {
                            return;
                        }
                        router.push('/');
                    },
                })
            );
        },
        [dispatch, router]
    );

    return <FormEmail actionString="Sign Up" isLoading={isLoading} onSubmit={handleSubmit} />;
};
