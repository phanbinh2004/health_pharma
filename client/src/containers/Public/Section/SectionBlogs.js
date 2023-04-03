import { Link } from "react-router-dom";

function SectionBlogs() {
  return (
    <section className="blog-wrap">
      <div className="blog-container">
        <div className="blog-main">
          <div className="blog-left col-lg-9 col-md-12 col-12">
            <div className="left-news">
              <div className="news-heading">
                <h2 className="news-title">Bài viết mới nhất</h2>
                <div className="more-news">
                  <Link to="">Xem thêm...</Link>
                </div>
              </div>
              <div className="news-content row">
                <div className="content-left col-lg-6"></div>
                <div className="content-right col-lg-6"></div>
              </div>
            </div>
          </div>
          <div className="blog-right col-lg-3 col-md-12 cpl-12">
            <div className="right-banner"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionBlogs;
