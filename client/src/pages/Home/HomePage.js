import Header from "../../components/Header/Header";
import SectionCategory from "../../containers/Public/Section/SectionCategory";
import SectionCollection from "../../containers/Public/Section/SectionCollection";
import SectionCoupon from "../../containers/Public/Section/SectionCoupon";
import SectionHigh from "../../containers/Public/Section/SectionHigh";
import SectionHomeTop from "../../containers/Public/Section/SectionHomeTop";
import SectionOutstanding from "../../containers/Public/Section/SectionOutstanding";
import SectionSale from "../../containers/Public/Section/SectionSale";
import SectionTopSell from "../../containers/Public/Section/SectionTopSell";
import SectionBotBanner from "../../containers/Public/Section/SectionBotBanner";
import SectionFUnctionProducts from "../../containers/Public/Section/SectionFunctionProducts";
import SectionBlogs from "../../containers/Public/Section/SectionBlogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function HomePage() {
  // const notify = (type,message) => toast();
  return (
    <div style={{ backgroundColor: "#f2f3f5" }}>
      <SectionHomeTop />
      <SectionOutstanding />
      <SectionCategory />
      <SectionSale />
      <SectionCoupon />
      <SectionTopSell />
      <SectionCollection />
      <SectionHigh />
      <SectionBotBanner />
      <SectionFUnctionProducts />
      <SectionBlogs />
    </div>
  );
}

export default HomePage;
