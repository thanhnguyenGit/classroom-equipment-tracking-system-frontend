import "../styles/Navbar.scss";
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import FullscreenExitOutlined from "@mui/icons-material/FullscreenExitOutlined";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlined from "@mui/icons-material/ListOutlined";

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
            <LanguageOutlinedIcon />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon />
          </div>
          <div className="item">
            <NotificationsOutlined />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <FullscreenExitOutlined />
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined />
            <div className="counter">10</div>
          </div>
          <div className="item">
            <ListOutlined />
          </div>
          <div className="item">
            <img src="https://en.wikipedia.org/wiki/Sean_Combs" alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
