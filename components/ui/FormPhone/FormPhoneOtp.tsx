import { useState } from 'react';
import Input from '../Input';
import LoadingButton from '../LoadingButton';
import SecondaryButton from '../SecondaryButton';

interface FormPhoneOtpProps {
    /** The phone number the OTP code was sent to. */
    phoneNumber: string;
    /** Callback for when the user wants to reset the phone number */
    onReset?: () => void;
    /** Callback for when the user submits their phone number */
    onSubmit?: (otp: string) => void;
}

/**
 * Form that asks the user for their phone number with a captcha
 */
export const FormPhoneOtp = ({ phoneNumber, onReset, onSubmit }: FormPhoneOtpProps) => {
    const [otpCode, setOTPCode] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) onSubmit(otpCode);
            }}
            className="max-w-xl w-full bg-white pt-6 rounded-lg flex flex-col items-center"
        >
            <p className="text-center mb-2">Code sent to {phoneNumber}</p>
            <div className="px-4 flex items-center gap-4">
                <Input
                    value={otpCode}
                    type="text"
                    placeholder="Enter your OTP"
                    onChange={(e) => setOTPCode(e.target.value)}
                />

                <LoadingButton loadingText="Verifying..." type="submit">
                    Verify
                </LoadingButton>
            </div>
            <SecondaryButton onClick={onReset} className="mb-2 mt-8 w-full">
                Wrong number?
            </SecondaryButton>
        </form>
    );
};
