import { useRouter } from 'next/router';
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';
import { useAppDispatch } from '../redux/store';
import { FormEmail } from './FormEmail';
import { useAuth } from '../useAuth';
import Spinner from '../Spinner';
import { LoadingStateTypes } from '../redux/types';

export const LoginEmail = () => {
    const auth = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const isLoading = useIsLoginWithEmailLoading();

    async function handleSubmit(email: string, password: string) {
        await dispatch(
            loginWithEmail({
                type: 'login',
                email,
                password,
                callback: (response) => {
                    if (response.type === 'error') return;
                    router.push('/');
                },
            })
        );
    }

    if (auth.type === LoadingStateTypes.LOADING) {
        return <Spinner />;
    }

    return <FormEmail onSubmit={handleSubmit} isLoading={isLoading} />;
};
