import RegisterForm from '../../../components/auth/RegisterForm';
import Link from 'next/link';

export default function RegistrationPage() {
    return (
        <div className="flex flex-col items-center">
            <RegisterForm />
        </div>
    );
}
