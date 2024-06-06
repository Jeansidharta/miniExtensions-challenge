import { useState } from 'react';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { FormPhoneNumber } from './FormPhoneNumber';
import { FormPhoneOtp } from './FormPhoneOtp';

interface LoginFormPhoneProps {
    /** Function called when the user submits their phone number */
    onSubmitPhoneNumber: (
        phoneNumber: string,
        recaptcha: RecaptchaVerifier,
        next: (confirmationResult: ConfirmationResult) => void
    ) => void;
    /** Function called when the user submits the OTP code that was sent to their phone */
    onSubmitOtp: (otp: string, confirmationResult: ConfirmationResult) => void;
}

type FormStage =
    | { stage: 'phone-number' }
    | {
        stage: 'otp';
        phoneNumber: string;
        confirmationResult: ConfirmationResult;
        linkSentTime: number;
    };

/**
 * The form used for asking an user their phone number, and then asking for the OTP
 * code sent to the user's phone
 */
export const FormPhone = ({ onSubmitPhoneNumber, onSubmitOtp }: LoginFormPhoneProps) => {
    const [formStage, setFormStage] = useState<FormStage>({ stage: 'phone-number' });

    if (formStage.stage === 'phone-number') {
        return (
            <FormPhoneNumber
                onSubmit={(phoneNumber, ConfirmationResult) =>
                    onSubmitPhoneNumber(phoneNumber, ConfirmationResult, (confirmationResult) =>
                        setFormStage({
                            stage: 'otp',
                            phoneNumber,
                            confirmationResult,
                            linkSentTime: Date.now(),
                        })
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
                linkSentTime={formStage.linkSentTime}
            />
        );
    }
};
