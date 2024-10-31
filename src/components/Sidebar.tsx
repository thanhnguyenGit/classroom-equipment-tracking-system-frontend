import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { SidebarItem } from './SidebarItem';

const Nav = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 5rem;
    background-color: black;
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: 250px;
    height: 100vh;
    background-color: black;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
`;

const NavIcon = styled(Link)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 5rem;
    font-size: 2rem;
    margin-left: 2rem;
`;

const SidebarWrap = styled.div``;

const SideBar: React.FC = () => {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Nav>
        <NavIcon to="#" onClick={showSidebar}>
          <AiOutlineMenu />
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#" onClick={showSidebar}>
            <AiOutlineClose />
          </NavIcon>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
}
export default SideBar;

const SidebarData: SidebarItem[] = [
  {
    title: 'System',
    path: '/system',
    subnav: [
      {
        title: 'Devices',
        path: '/system/devices'
      },
      {
        title: 'Tickets',
        path: '/system/tickets'
      }
    ]
  }
]

type SidebarLinkProps = {
  item: SidebarItem;
}

const SidebarLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.75rem;
    font-size: 1.125rem;
    padding: 2rem;
    text-decoration: none;
    color: #ffffff;

    &:hover {
        background-color: #1f1f1b;
        border-left: 4px solid #6d44dc;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 1rem;
`;

const DropdownLink = styled(Link)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 3.75rem;
    font-size: 1.125rem;
    padding-left: 3rem;
    text-decoration: none;
    color: #ffffff;

    &:hover {
        background-color: #6d44dc;
    }
`;

const Submenu: React.FC<SidebarLinkProps> = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>{item?.subnav && subnav ? item?.iconOpened : item?.iconClosed}</div>
      </SidebarLink>
      {subnav &&
        item?.subnav?.map((subnavItem, index) => {
          return (
            <DropdownLink to={subnavItem.path} key={index}>
              {subnavItem.icon}
              <SidebarLabel>{subnavItem.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
}
