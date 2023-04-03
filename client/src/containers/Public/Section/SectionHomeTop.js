import "./Section.scss";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
function SectionHomeTop() {
  return (
    <section className="home-top-wrap">
      <div className="home-top">
        <div className="home-top-left">
          <div className="left-content"></div>
        </div>
        <div className="home-top-right">
          <div className="row">
            <div className="slider-content">
              <div className="home-slider">
                <div className="slider-health">
                  <Slide>
                    <div className="each-slide-effect">
                      <div
                        style={{
                          width: "746px",
                          height: "427px",
                          backgroundImage: `url(https://theme.hstatic.net/200000599309/1000947063/14/slide_1_img.jpg?v=666)`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </div>
                    <div className="each-slide-effect">
                      <div
                        style={{
                          height: "427px",
                          width: "746px",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundImage: `url(https://theme.hstatic.net/200000599309/1000947063/14/slide_2_img.jpg?v=666)`,
                        }}
                      ></div>
                    </div>
                  </Slide>
                </div>
              </div>
            </div>
            <div className="image-content">
              <div className="group-banner-right">
                <div className="box-img">
                  <img
                    src="https://theme.hstatic.net/200000599309/1000947063/14/banner_top_1_img_large.jpg?v=666"
                    alt="img"
                    className="img"
                  />
                </div>
                <div className="box-img mt">
                  <img
                    src="https://theme.hstatic.net/200000599309/1000947063/14/banner_top_2_img_large.jpg?v=666"
                    alt="img"
                    className="img"
                  />
                </div>
                <div className="box-img mt">
                  <img
                    src="https://theme.hstatic.net/200000599309/1000947063/14/banner_top_3_img_large.jpg?v=666"
                    alt="img"
                    className="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionHomeTop;
