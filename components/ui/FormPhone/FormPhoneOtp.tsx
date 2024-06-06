import { useState } from 'react';
import Input from '../Input';
import LoadingButton from '../LoadingButton';

interface FormPhoneOtpProps {
    phoneNumber: string;
    onReset?: () => void;
    onSubmit?: (otp: string) => void;
}

export const FormPhoneOtp = ({ phoneNumber, onReset, onSubmit }: FormPhoneOtpProps) => {
    // TODO - remove debug value
    const [otpCode, setOTPCode] = useState('123456');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) onSubmit(otpCode);
            }}
            className="max-w-xl w-full bg-white py-6 rounded-lg"
        >
            <p className="text-lg font-semibold text-center mb-10">
                Code sent to {phoneNumber}. <span onClick={onReset}>Wrong number?</span>
            </p>
            <div className="px-4 flex items-center gap-4 pb-10">
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
        </form>
    );
};
