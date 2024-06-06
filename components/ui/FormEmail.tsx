import { useState } from 'react';

import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';

interface LoginFormEmailProps {
    onSubmit?: (email: string, password: string) => void;
    isLoading?: boolean;
    actionString?: string;
}

export const FormEmail = ({
    onSubmit,
    isLoading,
    actionString = 'Submit',
}: LoginFormEmailProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const disableSubmit = Boolean(email && password.length < 6);

    return (
        <form
            className="flex gap-4 flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) onSubmit(email, password);
            }}
        >
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                type="text"
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                type="password"
            />
            <LoadingButton type="submit" disabled={disableSubmit} loading={isLoading}>
                {actionString}
            </LoadingButton>
        </form>
    );
};
