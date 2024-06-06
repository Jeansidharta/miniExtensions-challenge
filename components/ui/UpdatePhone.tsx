import { ConfirmationResult, RecaptchaVerifier, User } from 'firebase/auth';
import { FormPhone } from './FormPhone';
import { verifyPhoneNumber } from '../redux/auth/verifyPhoneNumber';
import { useAppDispatch } from '../redux/store';
import { phoneNumberLinkVerificationCode } from '../redux/auth/phoneNumberLink';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ToastBox from './ToastBox';

interface LoginPhoneProps {
    user: User;
}

export const UpdatePhone = ({ user }: LoginPhoneProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleSubmitPhoneNumber(
        phoneNumber: string,
        recaptcha: RecaptchaVerifier,
        next: (confirmationResult: ConfirmationResult) => void
    ) {
        dispatch(
            phoneNumberLinkVerificationCode({
                phoneNumber,
                user,
                recaptcha,
                callback: (result) => {
                    if (result.type === 'error') {
                        // resetRecaptcha();
                        return;
                    }
                    next(result.confirmationResult);
                    // setConfirmationResult(result.confirmationResult);
                },
            })
        );
    }

    async function handleSubmitOtp(OTPCode: string, confirmationResult: ConfirmationResult) {
        dispatch(
            verifyPhoneNumber({
                confirmationResult: confirmationResult!,
                OTPCode,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    // needed to reload auth user
                    router.reload();
                },
            })
        );
    }

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <Image
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    <FormPhone
                        onSubmitPhoneNumber={handleSubmitPhoneNumber}
                        onSubmitOtp={handleSubmitOtp}
                    />
                </div>
            </div>
            <ToastBox />
        </div>
    );
};
