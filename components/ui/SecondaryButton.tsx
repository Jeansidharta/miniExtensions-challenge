import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={clsx(
                'border-violet-600 border-2 border-solid rounded-md py-1 px-2 text-violet-600',
                props.className
            )}
        />
    );
}
