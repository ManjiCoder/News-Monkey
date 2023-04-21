// eslint-disable-next-line react/prop-types
function HeadingInfo({ headingTxt }) {
  return (
    <h1
      className="text-center capitalize scroll-pt-11 text-3xl font-semibold px-8 py-3 pt-11
        dark:text-white"
    >
      {headingTxt}
    </h1>
  );
}
export default HeadingInfo;
