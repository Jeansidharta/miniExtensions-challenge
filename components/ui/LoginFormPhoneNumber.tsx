import { useState } from 'react';
import Input from './Input';
import LoadingButton from './LoadingButton';
import { useRecapcha } from '../useRecaptcha';
import { useAppDispatch } from '../redux/store';
import { loginWithPhoneNumberVerificationCode } from '../redux/auth/loginWithPhoneNumber';
import { ConfirmationResult } from 'firebase/auth';

interface LoginFormPhoneNumberProps {
    onSubmit?: (args: { confirmationResult: ConfirmationResult; phoneNumber: string }) => void;
}

export const LoginFormPhoneNumber = ({ onSubmit }: LoginFormPhoneNumberProps) => {
    const dispatch = useAppDispatch();
    // TODO - Remove debug number
    const [phoneNumber, setPhoneNumber] = useState('+1 330 599 9526');
    const { recaptcha, isCaptchaResolved, resetRecaptcha } = useRecapcha('recaptcha-container');

    const disableSubmit = Boolean(phoneNumber.length < 6);

    const handleSendVerification = async () => {
        dispatch(
            loginWithPhoneNumberVerificationCode({
                phoneNumber,
                recaptcha,
                recaptchaResolved: isCaptchaResolved,
                callback: (result) => {
                    if (result.type === 'error') {
                        resetRecaptcha();
                        return;
                    }
                    if (onSubmit)
                        onSubmit({ confirmationResult: result.confirmationResult, phoneNumber });
                },
            })
        );
    };

    return (
        <form
            className="flex gap-4 flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                handleSendVerification();
            }}
        >
            <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                type="tel"
            />
            <div id="recaptcha-container" className="flex justify-center" />
            <LoadingButton onClick={handleSendVerification} disabled={disableSubmit}>
                Send OTP
            </LoadingButton>
        </form>
    );
};
