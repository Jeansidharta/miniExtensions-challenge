import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export const PrimaryButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={clsx(
                'transition-colors bg-violet-600 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-700 disabled:bg-violet-400',
                props.className
            )}
        />
    );
};
