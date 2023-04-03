import { Link } from "react-router-dom";
import "./Section.scss";
import { useState, useEffect } from "react";
import { handleGetCategory } from "../../../services/userServices";
import { path } from "../../../ultils/constants";
function SectionOutstanding() {
  const [cate, setCate] = useState();
  useEffect(() => {
    const handleGetCate = async () => {
      let response = await handleGetCategory();
      if (response && response.errCode === 0) {
        setCate(response.categories);
      }
    };
    handleGetCate();
  }, []);
  return (
    <section className="out-wrap">
      <div className="out-top">
        <div className="row wrap-inline">
          <div className="out-top-heading">
            <h2 className="heading-title">Danh mục nổi bật</h2>
          </div>
          <div className="out-top-content">
            <div className="out-content">
              {cate &&
                cate.map((item) => {
                  return (
                    <Link
                      to={`/category/${item.name}/${item.keyMap}`}
                      className="cus-out"
                      key={item.keyMap}
                    >
                      <div className="item-icon">
                        <div className="item-img">
                          <span className="box-img">
                            <img src={item.thumbnail} alt={item.name} />
                          </span>
                        </div>
                        <div className="item-title">
                          <div className="item-link">
                            <span className="title-link">{item.name}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="out-bot"></div>
    </section>
  );
}

export default SectionOutstanding;
