/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';
import { RxCrossCircled } from 'react-icons/rx';
import searchIcon from '../Images/search.png';
import cancelIcon from '../Images/cancel.png';
import UseContext from '../Context/UseContext';
import DarkMode from './DarkMode';
import LiteMode from './LiteMode';
import UserInfo from './UserInfo';

const navList = Object.freeze([
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Business',
    href: '/business',
  },
  {
    name: 'Entertainment',
    href: '/entertainment',
  },
  {
    name: 'Health',
    href: '/health',
  },
  {
    name: 'Science',
    href: '/science',
  },
  {
    name: 'Sports',
    href: '/sports',
  },
  {
    name: 'Technology',
    href: '/technology',
  },
]);

function Navbar() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [text, setText] = useState(''); // For setting Text
  const { title, setQuery } = useContext(UseContext); // For setting useContext
  const {
    isDark, setIsDark, isOpen, setIsOpen,
  } = useContext(UseContext); // For Toggle Theme
  return (
    <nav className="sticky top-0 z-10 bg-gray-800 text-white flex items-center px-4 h-14">
      {/* NavIcon Section */}
      <button
        type="button"
        className="mr-3 lg:hidden flex place-items-center h-full text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? <BiMenuAltLeft /> : <RxCrossCircled />}
      </button>

      {/* Logo Section */}
      <div className="h-14 flex">
        <Link
          to="/"
          className="flex place-items-center cursor-pointer text-xl font-medium text-white"
        >
          {title}
        </Link>
      </div>

      {/* SideBar Section */}
      <ul
        className={`rounded-r-lg absolute lg:static top-14 border-t-2 lg:border-none left-0 bg-gray-800 lg:bg-inherit h-screen w-2/4 lg:w-auto lg:h-14 display-[none] lg:flex lg:translate-x-0 items-center lg:space-x-3 lg:pl-4 pr-9 lg:p-0 leading-tight ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ease-in duration-300 text-slate-400`}
      >
        <li />
        {navList.map(({ name, href }) => (
          <li className="h-14 flex" key={href}>
            <NavLink
              to={href}
              className="px-7 w-full lg:px-1.5 cursor-pointer hover:text-white flex place-items-center"
              style={({ isActive }) => ({
                color: isActive ? 'white' : undefined,
              })}
              onClick={() => setIsOpen(false)}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Search */}
      <form
        className="justify-self-end transition-all ml-auto flex items-center lg:space-x-3 space-x-1.5 pr-9"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="search"
          id="search"
          className="capitalize rounded-md py-0.5 pl-3 pr-9 w-[115px] lg:w-32 bg-gray-700 focus-within:bg-gray-600 outline-none"
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <img
          className={`${
            text.length !== 0 ? 'visible' : 'hidden'
          } invert absolute right-[137px] lg:right-[144px] w-5 cursor-pointer`}
          src={cancelIcon}
          alt=""
          onClick={() => setText('')}
        />

        {/* <label htmlFor="search"> */}
        {/* <Link className="flex" to={text}> */}
        <button
          type="submit"
          onClick={() => {
            navigate({
              pathname: 'search',
              search: text,
            });
            setQuery(text);
          }}
        >
          <img
            className="ml-0.5 mr-1.5 lg:m-0 invert w-5 cursor-pointer"
            src={searchIcon}
            alt="search"
          />
        </button>
        {/* </Link> */}

        {/* Toggle Theme Btn */}
        <button
          className="hover:bg-slate-700 rounded-full text-xl p-1"
          onClick={() => setIsDark(!isDark)}
          type="button"
        >
          {isDark ? <DarkMode /> : <LiteMode />}
        </button>

        {/* UserInfo */}
        {isAuthenticated && <UserInfo />}
      </form>
    </nav>
  );
}

export default Navbar;
