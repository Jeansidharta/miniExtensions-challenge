import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * @param props All props accepted by an input element
 * @returns
 */
const Input = (props: InputProps) => {
    return (
        <input
            {...props}
            className={clsx(
                'border rounded-lg px-4 py-2 focus-visible:outline-violet-500',
                props.className
            )}
        />
    );
};

export default Input;
