import { useAuth0 } from '@auth0/auth0-react';
import HeadingInfo from './HeadingInfo';

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      className="min-h-screen flex items-center flex-col justify-center bg-slate-100
          dark:bg-gradient-to-r from-slate-900 to-slate-700 dark:text-white
      "
    >
      <HeadingInfo headingTxt="Login to continues to NewsMonkey" />
      <button
        className="text-xl w-40 mt-7 font-semibold border shadow-md rounded-md bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-900 hover:bg-white hover:scale-105 transition-all duration-300  ease-in-out p-4"
        onClick={() => loginWithRedirect()}
        type="button"
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
