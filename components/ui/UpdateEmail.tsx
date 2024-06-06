import { useAppDispatch } from '../redux/store';
import ToastBox from './ToastBox';
import LoadingButton from './LoadingButton';
import Input from './Input';
import { sendEmailLink, useIsSendEmailLinkLoading } from '../redux/auth/sendEmailLink';
import { useState } from 'react';
import Image from 'next/image';

export const UpdateEmail = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [linkSentTime, setLinkSentTime] = useState<null | number>(null);

    const isLoading = useIsSendEmailLinkLoading();
    const disableButton = Boolean(isLoading || !email || email.search('@') === -1);

    async function handleSubmit() {
        await dispatch(sendEmailLink(email));
        setLinkSentTime(Date.now());
    }

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <Image
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    {linkSentTime ? (
                        <div>Link sent to your email {email}!</div>
                    ) : (
                        <form
                            className="flex gap-4 flex-col"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                name="email"
                                type="text"
                            />
                            <LoadingButton
                                type="submit"
                                loading={isLoading}
                                disabled={disableButton}
                            >
                                Submit
                            </LoadingButton>
                        </form>
                    )}
                </div>
            </div>
            <ToastBox />
        </div>
    );
};
