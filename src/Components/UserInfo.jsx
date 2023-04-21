import { Fragment, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Popover, Transition } from '@headlessui/react';
import { FaUser } from 'react-icons/fa';
import { MdBookmarkAdded, MdLogout, MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import UseContext from '../Context/UseContext';

function UserInfo() {
  const { logout, user } = useAuth0();
  const { isDark } = useContext(UseContext);
  // console.log({ user });
  return (
    <div className="absolute right-3">
      <Popover className="relative flex">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-full text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <img
                className="h-8 w-8 rounded-full"
                src={user.picture}
                alt="Profile"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute right-0 top-10  z-10 mt-3 p-4 rounded-md shadow-md w-auto max-w-sm transform px-4 sm:px-0 lg:max-w-3xl ${
                  isDark
                    ? 'bg-gradient-to-tr from-slate-900 to-slate-700 text-white'
                    : 'bg-gradient-to-tr from-white to-slate-300 text-black'
                }`}
              >
                <section className="overflow-hidden">
                  <div
                    className={`${
                      isDark ? 'hover:bg-slate-900' : 'hover:bg-slate-300'
                    } p-3 flex space-x-2 items-center justify-start px-2`}
                  >
                    <FaUser />
                    <p className="capitalize">
                      Welcome,
                      {' '}
                      {user.nickname}
                    </p>
                  </div>
                  <div
                    className={`${
                      isDark ? 'hover:bg-slate-900' : 'hover:bg-slate-300'
                    } p-3 flex space-x-2 items-center justify-start px-2`}
                  >
                    <MdOutlineEmail />
                    <p className="">{user.email}</p>
                  </div>

                  <Link
                    to="/saved-item"
                    type="button"
                    // onClick={() => logout({
                    //   logoutParams: { returnTo: window.location.origin },
                    // })}
                    className={`w-full ${
                      isDark ? 'hover:bg-slate-900' : 'hover:bg-slate-300'
                    } p-3 flex space-x-2 items-center justify-start px-2`}
                  >
                    <MdBookmarkAdded className="mr-2" />
                    Saved
                  </Link>
                  <button
                    type="button"
                    onClick={() => logout({
                      logoutParams: { returnTo: window.location.origin },
                    })}
                    className={`w-full ${
                      isDark ? 'hover:bg-slate-900' : 'hover:bg-slate-300'
                    } p-3 flex space-x-2 items-center justify-start px-2`}
                  >
                    <MdLogout className="mr-2" />
                    Log-Out
                  </button>
                </section>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default UserInfo;
