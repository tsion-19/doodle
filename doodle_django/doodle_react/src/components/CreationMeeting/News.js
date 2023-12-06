import "./news.css";

const News = ({ news, start, numberOfDivsNews }) => {
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 60 }}>
      {news.slice(start, numberOfDivsNews).map((item, index) => (
        <a
          className="a_news"
          href={"https://www.unical.it" + item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={index}>
          <div className="div_news">
            <img
              style={{ borderRadius: 10 }}
              className="image_news"
              src={"https://www.unical.it" + item.image}
              alt={item.alt}
            />
            <h4 style={{ paddingLeft: 10, paddingRight: 10 }}>
              {item.title_cut}
            </h4>
            {/* <p>{item.subheading}</p> */}
          </div>
        </a>
      ))}
    </div>
  );
};

export default News;
