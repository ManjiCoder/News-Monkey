/* eslint-disable react/require-default-props */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import SomethingWentWrong from './SomethingWentWrong';
import NoDataFound from './NoDataFound';
import HeadingInfo from './HeadingInfo';
import UseContext from '../Context/UseContext';

function News(props) {
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const [status, setStatus] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null); // Null is Important because it prevent from no data found while fetching
  const [error, setError] = useState(null);
  const { title, setIsOpen } = useContext(UseContext); // For Closing toggleSideBar

  // To Remove Catergory
  if (totalResults === 0) {
    document.title = `${props.title}`;
  } else {
    document.title = `${capitalizeFirstLetter(props.category)} ${props.title}`;
  }

  const updataNews = async () => {
    props.UpdateProgressBar(20);
    const url = `${props.url}&apikey=${props.API_KEY}&page=${page}&pageSize=${props.pagesize}`;
    props.UpdateProgressBar(40);
    const data = await fetch(url);
    props.UpdateProgressBar(60);
    const response = await data.json();
    props.UpdateProgressBar(80);
    // console.log(response); // For Development Only
    if (response.status === 'error') {
      props.UpdateProgressBar(100);
      setLoading(false);
      setStatus(response.status);
      setError(response.message);
      console.error(response.message);
      throw Error(response.message);
    } else {
      props.UpdateProgressBar(85);
      setArticles(response.articles);
      setTotalResults(response.totalResults);
      setLoading(false);
      setStatus(response.status);
      props.UpdateProgressBar(100);
      // console.log(articles.length); //  For Development Only
    }
    // console.log(url); //  For Development Only
    // console.log(page); //  For Development Only
  };

  useEffect(() => {
    updataNews();
    // For scrollToTop when is loads news
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    // Url Takes Time In Miliseconds To Load, So SetPage(page + 1) Is In Next Line From Url
    const url = `${props.url}&apikey=${props.API_KEY}&page=${page + 1}&pageSize=${
      props.pagesize
    }`;
    setPage(page + 1);
    setLoading(true);
    const data = await fetch(url);
    const response = await data.json();
    // console.log(response); // For Development Only
    if (response.status === 'error') {
      setLoading(false);
      setStatus(response.status);
      setError(response.message);
      console.error(response.message);
      throw Error(response.message);
    } else {
      setArticles(articles.concat(response.articles));
      setTotalResults(response.totalResults);
      setLoading(false);
      setStatus(response.status);
    }

    // console.log(url); //  For Development Only
    // console.log(page); //  For Development Only
    // console.log(articles.length); //  For Development Only
  };

  // console.table(props)   //  For Development Only
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="dark:bg-gray-900 min-h-screen bg-slate-300"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      {/* For Showing No Data Found */}
      {totalResults === 0 && status === 'ok' && <NoDataFound />}

      {/* For Showing Heading OR For Showing Error */}
      {status === 'error' && articles.length === 0 ? (
        <SomethingWentWrong error={error} />
      ) : status === 'ok' && articles.length !== 0 ? (
        <HeadingInfo
          headingTxt={`${title} - ${props.category} Top headlines`}
        />
      ) : (
        ''
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={status === 'ok' && articles.length && fetchMoreData}
        // hasMore={articles.length !== totalResults} // This is in working fine,but due to develper plan it fetch only 100 articles.
        hasMore={articles.length < 90}
        loader={loading && <Spinner />} // show Spinner only if loading is true in state
      >
        <div className="flex justify-center p-8 dark:bg-gray-900">
          <div className="w-screen grid gap-4 lg:gap-x-8 lg:gap-y-16 lg:justify-items-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {articles.map((element) => (
              <div key={element.url}>
                <NewsItem
                  newsTitle={element.title ? element.title : 'null'}
                  newsDescription={
                      element.description ? element.description : 'null'
                    }
                  imgUrl={
                      // eslint-disable-next-line no-param-reassign
                      (element.urlToImage
                        ||= 'https://d3hnfqimznafg0.cloudfront.net/images/news/ImageForNews_33264_16813708189423484.jpg')
                    }
                  newsUrl={element.url}
                  author={element.author ? element.author : 'Unknown'}
                  newsDate={`${new Date(
                    element.publishedAt,
                  ).toDateString()}, ${new Date(
                    element.publishedAt,
                  ).toLocaleTimeString()}`}
                  source={element.source.name}
                  color={props.badgeColor}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}
News.defaultProps = {
  title: 'NewsMonkey',
  pagesize: 12,
  badgeColor: 'dark',
  // country: 'in', //  Country is set to India as a Default
};

News.propTypes = {
  title: PropTypes.string,
  API_KEY: PropTypes.string,
  // country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
  badgeColor: PropTypes.string,
  UpdateProgressBar: PropTypes.func,
  url: PropTypes.string,
};

export default News;
