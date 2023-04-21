/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable react/require-default-props */
import { RWebShare } from 'react-web-share';
import { MdShare } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function NewsItem(props) {
  const {
    newsTitle,
    newsDescription,
    imgUrl,
    newsUrl,
    author,
    newsDate,
    source,
    color,
  } = props; // Destructing
  const { pathname } = useLocation();

  // eslint-disable-next-line no-unneeded-ternary
  const [isSaved, setIsSaved] = useState(pathname === '/saved-item' ? true : false);
  // const [saveArr, setSaveArr] = useState([]);

  const handleSaved = (data) => {
    setIsSaved(true);

    let itemsList = [];
    const getCarStorage = localStorage.getItem('saveList');
    if (getCarStorage) {
      itemsList = JSON.parse(localStorage.getItem('saveList'));
      itemsList.push(data);
      localStorage.setItem('saveList', JSON.stringify(itemsList));
    } else {
      itemsList.push(data);
      localStorage.setItem('saveList', JSON.stringify(itemsList));
    }
  };

  return (
    <div className="max-w-screen-sm 2xl:max-w-md  bg-white rounded-lg border border-gray-200 shadow-md dark:shadow-gray-800 dark:bg-gray-900 dark:border-gray-700 flex flex-col">
      <span
        className={`absolute self-end text-left text-white font-semibold px-2 py-0.5 rounded-full text-xs ${color}`}
      >
        {source}
      </span>
      <a href={imgUrl} target="_blank" rel="noreferrer">
        <img className="rounded-t-lg" src={imgUrl} alt="articles" />
      </a>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {newsTitle}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {newsDescription}
        </p>
        <p className="text-sm text-gray-500 my-2 dark:text-gray-400">
          <b>
            By
            {' '}
            {author}
          </b>
          {' '}
          on
          {' '}
          {newsDate}
        </p>

        <div className="flex justify-between items-center font-semibold">
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center py-2 px-3 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <button
            className="w-28 inline-flex pt-2.5 items-center justify-center py-2 px-3 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => handleSaved(props)}
          >
            Saved
            {' '}
            {isSaved ? <AiFillHeart className="ml-3 mb-0.5" /> : <AiOutlineHeart className="ml-3 mb-0.5" />}
          </button>

          <RWebShare
            data={{
              text: author,
              url: newsUrl,
              title: newsTitle,
            }}
            onClick={() => console.log('shared successfully!')}
          >
            <button
              className="w-28 inline-flex pt-2.5 items-center justify-center py-2 px-3 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Share
              {' '}
              <MdShare className="ml-3 mb-0.5" />
            </button>
          </RWebShare>

        </div>

      </div>
    </div>
  );
}
export default NewsItem;
