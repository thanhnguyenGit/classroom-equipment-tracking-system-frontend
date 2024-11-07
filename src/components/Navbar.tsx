import "../styles/Navbar.scss";
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Seach.." />
          <SearchOutlined />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlined />
            English

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
