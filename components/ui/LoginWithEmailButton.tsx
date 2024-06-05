import Image from 'next/image';
import EmailLogo from '@/public/statics/images/email.svg';
import { ButtonHTMLAttributes } from 'react';

const LoginWithPhoneButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            {...props}
        >
            <Image src={EmailLogo} alt="Google logo" layout="intrinsic" height={20} width={20} />
            <div className="ml-2">Email</div>
        </button>
    );
};

export default LoginWithPhoneButton;
