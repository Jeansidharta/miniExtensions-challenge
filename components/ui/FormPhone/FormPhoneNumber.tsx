import { useState } from 'react';
import Input from '../Input';
import LoadingButton from '../LoadingButton';
import { useRecapcha } from '../../useRecaptcha';
import { RecaptchaVerifier } from 'firebase/auth';

interface FormPhoneNumberProps {
    /** Callback for when the user submits their OTP code */
    onSubmit?: (phoneNumber: string, recaptcha: RecaptchaVerifier) => void;
}

/**
 * Form that asks the user for their OTP code
 */
export const FormPhoneNumber = ({ onSubmit }: FormPhoneNumberProps) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const { recaptcha, isCaptchaResolved } = useRecapcha('recaptcha-container');

    const disableSubmit = Boolean(phoneNumber.length < 6) || !isCaptchaResolved;

    const handleSendVerification = async () => {
        if (disableSubmit) {
            return;
        }

        if (onSubmit) onSubmit(phoneNumber, recaptcha!);
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
