import { ReactNode, useEffect, useState } from 'react';

interface CountdownProps {
    /** In milisseconds */
    startTime: number;
    /** In milisseconds */
    duration: number;

    renderNotDone: (remainingSeconds: number) => ReactNode;
    renderDone: () => ReactNode;
}

export const Countdown = ({ duration, startTime, renderDone, renderNotDone }: CountdownProps) => {
    const [remainingTime, setRemainingTime] = useState(duration);

    useEffect(() => {
        setRemainingTime(duration);

        const intervalHandler = setInterval(() => {
            const remainingTime = startTime + duration - Date.now();
            setRemainingTime(remainingTime);
            if (remainingTime <= 0) clearInterval(intervalHandler);
        }, 1000);

        return () => clearInterval(intervalHandler);
    }, [duration, startTime]);

    if (remainingTime > 0) return renderNotDone(remainingTime);
    else return renderDone();
};
