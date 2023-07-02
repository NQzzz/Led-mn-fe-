import './sidebar.css';
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Dashboard</h3>
          <ul className='sidebarList'>
            <Link to='/' className={`link ${location.pathname === '/' ? 'active' : ''}`}>
              <li className={`sidebarListItem ${location.pathname === '/' ? 'active' : ''}`}>
                <LineStyle className='sidebarIcon' />
                Home
              </li>
            </Link>
            <Link to='/analytics' className={`link ${location.pathname === '/analytics' ? 'active' : ''}`}>
              <li className={`sidebarListItem ${location.pathname === '/analytics' ? 'active' : ''}`}>
                <Timeline className='sidebarIcon' />
                Analytics
              </li>
            </Link>
            <Link to='/sales' className={`link ${location.pathname === '/sales' ? 'active' : ''}`}>
              <li className={`sidebarListItem ${location.pathname === '/sales' ? 'active' : ''}`}>
                <TrendingUp className='sidebarIcon' />
                Sales
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Quick Menu</h3>
          <ul className='sidebarList'>
            <Link to='/users' className={`link ${location.pathname === '/users' ? 'active' : ''}`}>
              <li className={`sidebarListItem ${location.pathname === '/users' ? 'active' : ''}`}>
                <PermIdentity className='sidebarIcon' />
                Users
              </li>
            </Link>
            <Link to='/products' className={`link ${location.pathname === '/products' ? 'active' : ''}`}>
              <li className={`sidebarListItem ${location.pathname === '/products' ? 'active' : ''}`}>
                <Storefront className='sidebarIcon' />
                Contents
              </li>
            </Link>
            <Link to='/department' className={`link ${location.pathname === '/department' ? 'active' : ''}`}>
              <li className={`sidebarListItem ${location.pathname === '/department' ? 'active' : ''}`}>
                <AttachMoney className='sidebarIcon' />
                Department
              </li>
            </Link>
            <Link to='/reports' className={`link ${location.pathname === '/reports' ? 'active' : ''}`}>
              <li className={`sidebarListItem ${location.pathname === '/reports' ? 'active' : ''}`}>
                <BarChart className='sidebarIcon' />
                Reports
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Notifications</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <MailOutline className='sidebarIcon' />
              Mail
            </li>
            <li className='sidebarListItem'>
              <DynamicFeed className='sidebarIcon' />
              Feedback
            </li>
            <li className='sidebarListItem'>
              <ChatBubbleOutline className='sidebarIcon' />
              Messages
            </li>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Staff</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <WorkOutline className='sidebarIcon' />
              Manage
            </li>
            <li className='sidebarListItem'>
              <Timeline className='sidebarIcon' />
              Analytics
            </li>
            <li className='sidebarListItem'>
              <Report className='sidebarIcon' />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
