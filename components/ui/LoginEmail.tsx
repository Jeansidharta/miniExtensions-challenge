import { useRouter } from 'next/router';
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';
import { useAppDispatch } from '../redux/store';
import { FormEmail } from './FormEmail';
import { useAuth } from '../useAuth';
import Spinner from '../Spinner';
import { LoadingStateTypes } from '../redux/types';

interface LoginEmail { }

export const LoginEmail = ({ }: LoginEmail) => {
    const auth = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const isLoading = useIsLoginWithEmailLoading();

    async function handleSubmit(email: string, password: string) {
        // Signing in with email and password and redirecting to home page
        await dispatch(
            loginWithEmail({
                type: 'login',
                email,
                password,
            })
        );
    }

    if (auth.type === LoadingStateTypes.LOADING) {
        return <Spinner />;
    } else if (auth.type === LoadingStateTypes.LOADED) {
        router.push('/');
        return <Spinner />;
    }

    return <FormEmail onSubmit={handleSubmit} isLoading={isLoading} />;
};
