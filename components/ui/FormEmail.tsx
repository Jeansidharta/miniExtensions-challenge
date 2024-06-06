import { ReactNode, useState } from 'react';

import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';

interface LoginFormEmailProps {
    /** Function called when the form submits */
    onSubmit?: (email: string, password: string) => void;
    /** Wether the submit button should show a loading state */
    isLoading?: boolean;
    /** Text displayed in the submit button */
    actionString?: ReactNode;
}

/**
 * The form used for asking an user thei email and password
 */
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
