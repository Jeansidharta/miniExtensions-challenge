import { useState } from 'react';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { FormPhoneNumber } from './FormPhoneNumber';
import { FormPhoneOtp } from './FormPhoneOtp';

interface LoginFormPhoneProps {
    onSubmitPhoneNumber: (
        phoneNumber: string,
        recaptcha: RecaptchaVerifier,
        next: (confirmationResult: ConfirmationResult) => void
    ) => void;
    onSubmitOtp: (otp: string, confirmationResult: ConfirmationResult) => void;
}

type FormStage =
    | { stage: 'phone-number' }
    | { stage: 'otp'; phoneNumber: string; confirmationResult: ConfirmationResult };

export const FormPhone = ({ onSubmitPhoneNumber, onSubmitOtp }: LoginFormPhoneProps) => {
    const [formStage, setFormStage] = useState<FormStage>({ stage: 'phone-number' });

    if (formStage.stage === 'phone-number') {
        return (
            <FormPhoneNumber
                onSubmit={(phoneNumber, ConfirmationResult) =>
                    onSubmitPhoneNumber(phoneNumber, ConfirmationResult, (confirmationResult) =>
                        setFormStage({ stage: 'otp', phoneNumber, confirmationResult })
                    )
                }
            />
        );
    } else {
        return (
            <FormPhoneOtp
                onSubmit={(otp) => onSubmitOtp(otp, formStage.confirmationResult)}
                phoneNumber={formStage.phoneNumber}
                onReset={() => setFormStage({ stage: 'phone-number' })}
            />
        );
    }
};
