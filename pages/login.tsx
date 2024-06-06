/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import ToastBox from '@/components/ui/ToastBox';
import LoginWithGoogleButton from '@/components/ui/LoginWithGoogleButton';
import SignUpModal from '@/components/ui/SignUpModal';
import LoginWithPhoneButton from '@/components/ui/LoginWithPhoneButton';
import LoginWithEmailButton from '@/components/ui/LoginWithEmailButton';
import { LoginPhone } from '@/components/ui/LoginPhone';
import { LoginEmail } from '@/components/ui/LoginEmail';

export const googleLoginProvider = new GoogleAuthProvider();

enum LoginMethods {
    Email = 'email',
    Phone = 'phone',
}

const LoginPage: NextPage = () => {
    const [showRegistration, setShowRegistration] = useState(false);

    const [loginMethod, setLoginMethod] = useState<LoginMethods>(LoginMethods.Email);

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
                    <div className="flex gap-4 mb-5 flex-col">
                        {loginMethod === LoginMethods.Email ? (
                            <LoginEmail />
                        ) : loginMethod === LoginMethods.Phone ? (
                            <LoginPhone />
                        ) : undefined}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or login with</span>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-3">
                            {loginMethod !== LoginMethods.Phone && (
                                <LoginWithPhoneButton
                                    onClick={() => setLoginMethod(LoginMethods.Phone)}
                                />
                            )}
                            {loginMethod !== LoginMethods.Email && (
                                <LoginWithEmailButton
                                    onClick={() => setLoginMethod(LoginMethods.Email)}
                                />
                            )}
                            <LoginWithGoogleButton />
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-center">
                                <div className="relative flex justify-center text-sm">
                                    <div className="font-small text-black-400">
                                        Don't have an account?
                                    </div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <div
                                        onClick={() => setShowRegistration(true)}
                                        className="ml-2 cursor-pointer font-medium text-violet-600 hover:text-violet-400"
                                    >
                                        Sign Up
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SignUpModal open={showRegistration} setOpen={setShowRegistration} />
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default LoginPage;
