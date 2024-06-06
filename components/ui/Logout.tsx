import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/auth/logOut';
import { ButtonHTMLAttributes } from 'react';
import SecondaryButton from './SecondaryButton';

export default function Logout(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const dispatch = useAppDispatch();
    const loggedOut = async () => {
        try {
            dispatch(logout());
        } catch (error) {
            console.log(error, 'error while logout');
        }
    };
    return (
        <SecondaryButton {...props} onClick={loggedOut}>
            Logout
        </SecondaryButton>
    );
}
