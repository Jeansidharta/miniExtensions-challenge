import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import ToastBox from '@/components/ui/ToastBox';
import { useAppDispatch } from '@/components/redux/store';
import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';
import Logout from './Logout';
import { useAuth } from '../useAuth';
import { LoadingStateTypes } from '../redux/types';
import { useVerifyPhoneNumberLoading, verifyPhoneNumber } from '../redux/auth/verifyPhoneNumber';
import { useRecapcha } from '../useRecaptcha';
import {
    phoneNumberLinkVerificationCode,
    usePhoneNumberLinkVerificationCodeLoading,
} from '../redux/auth/phoneNumberLink';
import { ConfirmationResult } from 'firebase/auth';

const PhoneVerification = () => {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [OTPCode, setOTPCode] = useState('');
    const [show, setShow] = useState(false);

    const sendVerificationLoading = usePhoneNumberLinkVerificationCodeLoading();
    const verifyPhoneNumberLoading = useVerifyPhoneNumberLoading();

    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    const { recaptcha, isCaptchaResolved, resetRecaptcha } = useRecapcha('recaptcha-container');

    // Sending OTP and storing id to verify it later
    const handleSendVerification = async () => {
        if (auth.type !== LoadingStateTypes.LOADED) return;

        dispatch(
            phoneNumberLinkVerificationCode({
                phoneNumber,
                auth,
                recaptcha,
                recaptchaResolved: isCaptchaResolved,
                callback: (result) => {
                    if (result.type === 'error') {
                        resetRecaptcha();
                        return;
                    }
                    setConfirmationResult(result.confirmationResult);
                    setShow(true);
                },
            })
        );
    };

    // Validating the filled OTP by user
    const ValidateOtp = async () => {
        if (auth.type !== LoadingStateTypes.LOADED) return;
        dispatch(
            verifyPhoneNumber({
                confirmationResult: confirmationResult!,
                OTPCode,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    // needed to reload auth user
                    // router.refresh();
                },
            })
        );
    };

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="phone number"
                            type="text"
                        />
                        <LoadingButton
                            onClick={handleSendVerification}
                            loading={sendVerificationLoading}
                            loadingText="Sending OTP"
                        >
                            Send OTP
                        </LoadingButton>
                    </div>
                    <div id="recaptcha-container" />
                    <div className="flex w-full flex-col">
                        <Logout />
                    </div>

                    <Modal show={show} setShow={setShow}>
                        <div className="max-w-xl w-full bg-white py-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-center mb-10">
                                Enter Code to Verify
                            </h2>
                            <div className="px-4 flex items-center gap-4 pb-10">
                                <Input
                                    value={OTPCode}
                                    type="text"
                                    placeholder="Enter your OTP"
                                    onChange={(e) => setOTPCode(e.target.value)}
                                />

                                <LoadingButton
                                    onClick={ValidateOtp}
                                    loading={verifyPhoneNumberLoading}
                                    loadingText="Verifying..."
                                >
                                    Verify
                                </LoadingButton>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default PhoneVerification;
