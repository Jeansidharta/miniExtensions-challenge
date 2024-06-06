import { useCallback, useEffect, useState } from 'react';
import { showToast } from '@/components/redux/toast/toastSlice';
import { RecaptchaVerifier } from 'firebase/auth';
import { useAppDispatch } from './redux/store';
import { firebaseAuth } from './firebase/firebaseAuth';

export const useRecapcha = (targetId: string) => {
    const dispatch = useAppDispatch();
    const [isResolved, setIsResolved] = useState<boolean>(false);
    const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);

    const resetRecaptcha = useCallback(() => setIsResolved(false), []);

    useEffect(() => {
        const captcha = new RecaptchaVerifier(firebaseAuth, targetId, {
            size: 'normal',
            callback: () => setIsResolved(true),

            'expired-callback': () => {
                setIsResolved(false);
                dispatch(
                    showToast({
                        message: 'Recaptcha Expired, please verify it again',
                        type: 'info',
                    })
                );
            },
        });

        // generating the recaptcha on page render
        captcha.render();

        setRecaptcha(captcha);
    }, [dispatch, targetId]);

    return { isCaptchaResolved: isResolved, recaptcha, resetRecaptcha };
};
