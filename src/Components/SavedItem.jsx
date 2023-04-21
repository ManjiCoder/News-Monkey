/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
// import NewsItem from './NewsItem';
import { useEffect, useState } from 'react';
import HeadingInfo from './HeadingInfo';
import NewsItem from './NewsItem';
// import NewsItem from './NewsItem';

function SavedItem() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('saveList'));
    const temp = [];
    data.map((obj) => {
      temp.push(obj);
    });
    setArr(arr.concat(temp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(arr);

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen bg-slate-300">
      {!localStorage.getItem('saveList') ? (
        <HeadingInfo headingTxt="Your saved-list is empty" />
      ) : (
        <div className="flex justify-center p-8 dark:bg-gray-900">
          <div className="w-screen grid gap-4 lg:gap-x-8 lg:gap-y-16 lg:justify-items-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {arr.map((element) => (
              <div key={element.newsUrl}>
                <NewsItem
                  newsTitle={element.newsTitle ? element.newsTitle : 'null'}
                  newsDescription={
                    element.newsDescription ? element.newsDescription : 'null'
                  }
                  imgUrl={
                    // eslint-disable-next-line no-param-reassign
                    (element.imgUrl
                      ||= 'https://d3hnfqimznafg0.cloudfront.net/images/news/ImageForNews_33264_16813708189423484.jpg')
                  }
                  newsUrl={element.newsUrl}
                  author={element.author ? element.author : 'Unknown'}
                  newsDate={`${new Date(
                    element.newsDate,
                  ).toDateString()}, ${new Date(
                    element.newsDate,
                  ).toLocaleTimeString()}`}
                  source={element.source}
                  color="primary"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedItem;
