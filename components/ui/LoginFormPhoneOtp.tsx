import { useState } from 'react';
import Input from './Input';
import LoadingButton from './LoadingButton';
import { LoadingStateTypes } from '../redux/types';
import { verifyPhoneNumber } from '../redux/auth/verifyPhoneNumber';
import { useAuth } from '../useAuth';
import { useAppDispatch } from '../redux/store';
import { ConfirmationResult } from 'firebase/auth';
import { useRouter } from 'next/router';

interface LoginFormPhoneOtpProps {
    confirmationResult: ConfirmationResult;
    phoneNumber: string;
    onReset?: () => void;
}

export const LoginFormPhoneOtp = ({
    confirmationResult,
    phoneNumber,
    onReset,
}: LoginFormPhoneOtpProps) => {
    const auth = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    // TODO - remove debug value
    const [OTPCode, setOTPCode] = useState('123456');

    // Validating the filled OTP by user
    const validateOtp = async () => {
        console.log('Clicked in validate otp');
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
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                validateOtp();
            }}
            className="max-w-xl w-full bg-white py-6 rounded-lg"
        >
            <p className="text-lg font-semibold text-center mb-10">
                Code sent to {phoneNumber}. <span onClick={onReset}>Wrong number?</span>
            </p>
            <div className="px-4 flex items-center gap-4 pb-10">
                <Input
                    value={OTPCode}
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
