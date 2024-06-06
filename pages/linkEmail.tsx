import { AuthGuard, useAuth } from '@/components/useAuth';
import { LoadingStateTypes } from '@/components/redux/types';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { EmailAuthProvider, User, linkWithCredential } from 'firebase/auth';
import { useRouter } from 'next/router';

export function LinkEmail() {
    const auth = useAuth();

    if (auth.type === LoadingStateTypes.LOADING) return <Spinner />;

    if (auth.type === LoadingStateTypes.NOT_LOADED)
        return <div>You must open this link in a device that you're logged in</div>;

    if (auth.type !== LoadingStateTypes.LOADED) return <div>Error loading this link</div>;

    if (auth.user.email) return <div>An email was already linked to this user</div>;
    if (!auth.user.phoneNumber)
        return <div>A phone number must've been previously linked to this user</div>;

    const email = localStorage.getItem('sign-in-email');
    if (!email) return <div>You must open this link in the device that you used to send it.</div>;

    return <LinkEmailAction user={auth.user} email={email} />;
}

function LinkEmailAction({ user, email }: { user: User; email: string }) {
    const router = useRouter();
    const [error, setError] = useState<null | any>(null);
    async function link() {
        const credential = EmailAuthProvider.credentialWithLink(email, window.location.href);
        try {
            await linkWithCredential(user, credential);
            router.push('/');
        } catch (e) {
            console.error('Sign in error', e);
            setError(e);
        }
    }

    useEffect(() => {
        link();
    }, []);

    if (!error) return <Spinner />;

    return <div>There was an error in the sign in proccess</div>;
}

const LinkEmailAuthGuard = () => (
    <AuthGuard>
        <LinkEmail />
    </AuthGuard>
);

export default LinkEmailAuthGuard;
