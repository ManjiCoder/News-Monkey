/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import UseContext from './Context/UseContext';
import Navbar from './Components/Navbar';
import ScrollToTopBtn from './Components/ScrollToTopBtn';
import News from './Components/News';
import Footer from './Components/Footer';
import IsUser from './Routes/IsUser';
import SavedItem from './Components/SavedItem';

// To get stored data in localStroage
const getLocalStroageData = () => {
  const userMode = JSON.parse(localStorage.getItem('theme'));
  // console.log(userMode);
  if (userMode) {
    return true;
  }
  return false;
};

function App() {
  const title = 'NewsMonkey';
  const pagesize = 16;
  const country = 'in';
  // const { search } = useLocation();

  // const API_KEY = '0c8d38e5a8ff4712a05ef4d14e5d80b0'; // News API_KEY
  const API_KEY = 'e93da7be7e134c76afa08f33b2b2b96b'; // News API_KEY

  // Creating Date
  const date = new Date();
  const date_ = String(date.getDate() - 7).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const todayDate = `${year}-${month}-${date_}`;
  // console.log(todayDate);

  const [progress, setProgress] = useState(0);
  const setProgressBar = (UpdateProgress) => {
    setProgress(UpdateProgress);
  };

  // For Navbar - Lifting UP State (Passing Data From Child To Parent) Using useContext
  const [query, setQuery] = useState('');
  const [isDark, setIsDark] = useState(getLocalStroageData());
  const [isOpen, setIsOpen] = useState(false); // For toggleSideBar

  useEffect(() => {
    // To stored data in localStroage
    localStorage.setItem('theme', JSON.stringify(isDark));
    setQuery(window.location.search ? window.location.search.replace('?', '') : '');
    // console.log(query);
  }, [isDark, query]);

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <UseContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          title,
          query,
          setQuery,
          isDark,
          setIsDark,
          isOpen,
          setIsOpen,
        }}
      >
        <Router>
          <ScrollToTopBtn />
          {/* Top Loading Bar */}
          <LoadingBar color="#f11946" height={2.5} progress={progress} />

          <Navbar />
          <Routes>
            <Route path="/saved-item" element={<SavedItem />} />
            <Route
              path="*"
              element={(
                <News
                  title="NewsMonkey"
                  category=""
                  badgeColor="bg-black"
                  API_KEY={API_KEY}
                  pagesize={pagesize}
                  UpdateProgressBar={setProgressBar}
                  url={`https://newsapi.org/v2/top-headlines?country=${country}&category=general&`}
                />
              )}
            />

            <Route element={<IsUser />}>
              <Route
                path="/"
                element={(
                  <News
                    title={title}
                    category=""
                    badgeColor="bg-black"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/top-headlines?country=${country}&category=general&`}
                  />
                )}
              />

              <Route
                path="/business"
                element={(
                  <News
                    key="business"
                    title="NewsMonkey"
                    category="business"
                    badgeColor="bg-violet-800"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/top-headlines?country=${country}&category=business&`}
                  />
                )}
              />

              <Route
                path="/entertainment"
                element={(
                  <News
                    key="entertainment"
                    title="NewsMonkey"
                    category="entertainment"
                    badgeColor="bg-lime-600"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/top-headlines?country=${country}&category=entertainment&`}
                  />
                )}
              />

              <Route
                path="/health"
                element={(
                  <News
                    key="health"
                    title="NewsMonkey"
                    category="health"
                    badgeColor="bg-red-600"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/top-headlines?country=${country}&category=health&`}
                  />
                )}
              />

              <Route
                path="/science"
                element={(
                  <News
                    key="science"
                    title="NewsMonkey"
                    category="science"
                    badgeColor="bg-blue-700"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/top-headlines?country=${country}&category=science&`}
                  />
                )}
              />

              <Route
                path="/sports"
                element={(
                  <News
                    key="sports"
                    title="NewsMonkey"
                    category="sports"
                    badgeColor="bg-sky-500"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/top-headlines?country=${country}&category=sports&`}
                  />
                )}
              />

              <Route
                path="/technology"
                element={(
                  <News
                    key="technology"
                    title="NewsMonkey"
                    category="technology"
                    badgeColor="bg-fuchsia-600"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/top-headlines?country=${country}&category=technology&`}
                  />
                )}
              />

              <Route
                path="search"
                element={(
                  <News
                    key={query}
                    title="NewsMonkey"
                    category={query.toLowerCase()}
                    badgeColor="bg-black"
                    API_KEY={API_KEY}
                    pagesize={pagesize}
                    UpdateProgressBar={setProgressBar}
                    url={`https://newsapi.org/v2/everything?q=${query.replaceAll(
                      ' ',
                      '%20',
                    )}&from=${todayDate}&sortBy=publishedAt`}
                  />
                )}
              />
            </Route>
          </Routes>
          <Footer title="NewsMonkey" />
        </Router>
      </UseContext.Provider>
    </div>
  );
}

export default App;
