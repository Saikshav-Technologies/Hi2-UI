import LoginForm from '../../../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Login Page Active</h1>
            <LoginForm />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/registration" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
