import ToastBox from '@/components/ui/ToastBox';
import { UpdatePhone } from './UpdatePhone';

const PhoneVerification = () => {
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
                    <UpdatePhone />
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default PhoneVerification;
