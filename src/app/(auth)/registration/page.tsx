import RegisterForm from '../../../components/auth/RegisterForm';
import Link from 'next/link';

export default function RegistrationPage() {
    return (
        <div className="flex flex-col items-center">
            <RegisterForm />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
