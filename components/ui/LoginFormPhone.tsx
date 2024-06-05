import { useState } from 'react';
import { LoginFormPhoneNumber } from './LoginFormPhoneNumber';
import { LoginFormPhoneOtp } from './LoginFormPhoneOtp';
import { ConfirmationResult } from 'firebase/auth';

interface LoginFormPhoneProps { }

export const LoginFormPhone = ({ }: LoginFormPhoneProps) => {
    const [phoneNumberData, setPhoneNumberData] = useState<{
        confirmationResult: ConfirmationResult;
        phoneNumber: string;
    } | null>(null);

    if (phoneNumberData) {
        return (
            <LoginFormPhoneOtp
                phoneNumber={phoneNumberData.phoneNumber}
                confirmationResult={phoneNumberData.confirmationResult}
                onReset={() => setPhoneNumberData(null)}
            />
        );
    } else {
        return <LoginFormPhoneNumber onSubmit={setPhoneNumberData} />;
    }
};
