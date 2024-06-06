import { useState } from 'react';
import Modal from './Modal';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import { SignupEmail } from './SignupEmail';
import { LoginPhone } from './LoginPhone';
import LoginWithPhoneButton from './LoginWithPhoneButton';
import LoginWithEmailButton from './LoginWithEmailButton';

enum SignupMethods {
    Email = 'email',
    Phone = 'phone',
}

interface SignUpModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}
const SignUpModal = (props: SignUpModalProps) => {
    const [signupMethod, setSignupMethod] = useState<SignupMethods>(SignupMethods.Email);

    return (
        <Modal show={props.open} setShow={props.setOpen}>
            <div className="max-w-md w-full bg-white py-6 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-center mb-10">Sign Up</h2>
                {signupMethod === SignupMethods.Email ? <SignupEmail /> : <LoginPhone />}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-3">
                    {signupMethod !== SignupMethods.Phone && (
                        <LoginWithPhoneButton
                            onClick={() => setSignupMethod(SignupMethods.Phone)}
                        />
                    )}
                    {signupMethod !== SignupMethods.Email && (
                        <LoginWithEmailButton
                            onClick={() => setSignupMethod(SignupMethods.Email)}
                        />
                    )}
                    <LoginWithGoogleButton />
                </div>
            </div>
        </Modal>
    );
};

export default SignUpModal;
