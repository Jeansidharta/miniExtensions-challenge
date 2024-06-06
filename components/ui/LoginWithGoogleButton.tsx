import Image from 'next/image';
import GoogleGLogo from '@/public/statics/images/google-g-logo.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebaseAuth';
import { useRouter } from 'next/router';

const provider = new GoogleAuthProvider();

/**
 * Use this component to trigger Google modal and login with Google account
 */
const LoginWithGoogleButton = () => {
    const router = useRouter();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            GoogleAuthProvider.credentialFromResult(result);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            onClick={loginWithGoogle}
        >
            <Image src={GoogleGLogo} alt="Google logo" height={20} width={20} />
            <div className="ml-2">Google</div>
        </button>
    );
};

export default LoginWithGoogleButton;
