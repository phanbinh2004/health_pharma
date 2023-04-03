import Header from "../../components/Header/Header";
function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#f2f3f5" }}>{children}</div>
    </div>
  );
}

export default HeaderOnly;
