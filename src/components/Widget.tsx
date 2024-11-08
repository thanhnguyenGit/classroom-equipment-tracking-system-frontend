import "../styles/Widget.scss";
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import ListSharp from '@mui/icons-material/ListSharp';
import DeviceHub from '@mui/icons-material/DeviceHub'

const Widget = ({ type }: { type: string }) => {
  let data;

  //temporary data
  const nums = 200;
  const diff = 30;

  switch (type) {
    case "tickets":
      data = {
        tilte: "Tickets",
        amount: false,
        link: "See all tickets",
        icon: (
          <ListSharp className="icon" />
        )
      };
      break;
    case "devices":
      data = {
        tilte: "Devices",
        isMoney: false,
        link: "See all devices",
        icon: (
          <DeviceHub className="icon" />
        )
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.tilte}</span>
        <span className="counter">{data?.amount} {nums}</span>
        <span className="link">{data?.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          {diff} %
        </div>
        {data?.icon}

      </div>
    </div>
  )
}

export default Widget;
