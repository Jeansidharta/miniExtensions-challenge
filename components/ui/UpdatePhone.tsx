import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { FormPhone } from './FormPhone';
import { verifyPhoneNumber } from '../redux/auth/verifyPhoneNumber';
import { useAppDispatch } from '../redux/store';
import { useAuth } from '../useAuth';
import { LoadingStateTypes } from '../redux/types';
import { phoneNumberLinkVerificationCode } from '../redux/auth/phoneNumberLink';
import { useRouter } from 'next/router';

interface LoginPhoneProps { }

export const UpdatePhone = ({ }: LoginPhoneProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const auth = useAuth();

    async function handleSubmitPhoneNumber(
        phoneNumber: string,
        recaptcha: RecaptchaVerifier,
        next: (confirmationResult: ConfirmationResult) => void
    ) {
        if (auth.type !== LoadingStateTypes.LOADED) return;

        dispatch(
            phoneNumberLinkVerificationCode({
                phoneNumber,
                auth,
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
        <FormPhone onSubmitPhoneNumber={handleSubmitPhoneNumber} onSubmitOtp={handleSubmitOtp} />
    );
};
