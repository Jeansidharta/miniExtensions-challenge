import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { FormPhone } from './FormPhone';
import { loginWithPhoneNumberVerificationCode } from '../redux/auth/loginWithPhoneNumber';
import { verifyPhoneNumber } from '../redux/auth/verifyPhoneNumber';
import { useAppDispatch } from '../redux/store';
import { useRouter } from 'next/router';

interface LoginPhoneProps { }

export const LoginPhone = ({ }: LoginPhoneProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleSubmitPhoneNumber(
        phoneNumber: string,
        recaptcha: RecaptchaVerifier,
        next: (confirmationResult: ConfirmationResult) => void
    ) {
        dispatch(
            loginWithPhoneNumberVerificationCode({
                phoneNumber,
                recaptcha,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    next(result.confirmationResult);
                },
            })
        );
    }

    async function handleSubmitOtp(OTPCode: string, confirmationResult: ConfirmationResult) {
        dispatch(
            verifyPhoneNumber({
                OTPCode,
                confirmationResult,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    router.push('/');
                },
            })
        );
    }

    return (
        <FormPhone onSubmitPhoneNumber={handleSubmitPhoneNumber} onSubmitOtp={handleSubmitOtp} />
    );
};
