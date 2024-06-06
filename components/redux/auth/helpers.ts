import { debugErrorMap } from 'firebase/auth';

export const getFriendlyMessageFromFirebaseErrorCode = (errorCode: string | null) => {
    const code = errorCode?.replace('auth/', '');
    const messageFromFirebase: string | null = code
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        debugErrorMap()[code] ??
        ({ 'invalid-login-credentials': 'Invalid email or password' }[code] as any)
        : null;
    return (
        messageFromFirebase ??
        'Something happened while we were processing your request, please try again.'
    );
};
