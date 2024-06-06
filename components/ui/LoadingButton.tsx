import { ButtonHTMLAttributes } from 'react';
import Spinner from '../Spinner';
import { PrimaryButton } from './PrimaryButton';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Optional boolean to show loading state */
    loading?: boolean;
    /** Optional string to replace the loading spinner with text */
    loadingText?: string;
}

const LoadingButton = ({ loading, disabled, loadingText, ...props }: LoadingButtonProps) => {
    return (
        <PrimaryButton {...props} disabled={loading || disabled}>
            {loading
                ? loadingText || (
                    <div className="w-full flex items-center justify-center">
                        <Spinner theme="dark" />
                    </div>
                )
                : props.children}
        </PrimaryButton>
    );
};

export default LoadingButton;
