import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function SectionCollection() {
  return (
    <section className="collection-wrap">
      <div className="collection-container">
        <div className="collection-heading">
          <h2 className="heading-title">Bộ sưu tập mới</h2>
          <div className="box-tablist">
            <ul className="tab-list">
              <li className="tab-item">
                <button className="btn-tab active">Giảm đau hạ sốt</button>
              </li>
              <li className="tab-item">
                <button className="btn-tab">Thuốc ho</button>
              </li>
              <li className="tab-item">
                <button className="btn-tab">Mắt tai mũi họng</button>
              </li>
              <li className="tab-item">
                <button className="btn-tab">Tiêu hoá</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="collection-main">
          <div className="content-left">
            <div className="wrap-img">
              <img
                src="https://theme.hstatic.net/200000599309/1000947063/14/home_tabs_1_banner.jpg?v=666"
                alt=""
              />
            </div>
          </div>
          <div className="content-right">
            <div className="product">
              <div className="box-product list-product">
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-item">
                  <div className="product-loop">
                    <div className="product-inner">
                      <div className="product-image">
                        <div className="full-img">
                          <div className="first-img">
                            <div className="img-f"></div>
                          </div>
                          <div className="second-img">
                            <div className="img-l"></div>
                          </div>
                        </div>
                        <span className="eye">
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </span>
                      </div>
                      <div className="product-details">
                        <div className="details-top">
                          <div className="vendor">
                            <Link to="">Phương y nam</Link>
                          </div>
                        </div>
                        <span className="description">
                          Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                          trợ tai mũi họng (75ml)
                        </span>
                        <div className="variant"></div>
                        <div className="price">
                          <div className="price-box">
                            <span className="price-curr">290,000₫</span>
                            <br />
                            <span className="price-old">300,000₫</span>
                          </div>
                          <div className="sale-box">-3%</div>
                        </div>
                        <div className="actions">
                          <div className="actions-inner">
                            <button type="submit" className="btn-cart">
                              <span className="btn-add">Thêm giỏ hàng</span>
                              <span className="btn-icon">
                                <FontAwesomeIcon
                                  icon={faCartPlus}
                                  className="icon"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionCollection;
