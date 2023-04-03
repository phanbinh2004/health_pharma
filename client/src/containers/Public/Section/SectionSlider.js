import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function SectionSlider({ children, ...props }) {
  console.log(props.view);
  const settings = {
    dots: props.dots ? true : false,
    infinite: false,
    speed: 500,
    slidesToShow: props?.view || 5,
    slidesToScroll: 2,
    arrows: props.button ? false : true,
  };
  return <Slider {...settings}>{children}</Slider>;
}

export default SectionSlider;
