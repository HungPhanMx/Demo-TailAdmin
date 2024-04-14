import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import ImprintX from '../../images/logo/ImprintX.svg';
import VersionTag from './VersionTag';
import NumberTag from './NumberTag';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-10 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={ImprintX} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Dashboard
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              eCommerce
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li>
                            <NavLink
                              to="/dashboard/analytics"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Analytics
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/dashboard/data-request"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Data Request
                            </NavLink>
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/dashboard/marketing"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Marketing
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/dashboard/crm"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              CRM
                            </NavLink>
                            <VersionTag />
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Calendar
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Profile
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Task --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/task' || pathname.includes('task')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/task' || pathname.includes('task')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                        >
                          <path
                            d="M3.45928 1.7666H1.6874C1.04053 1.7666 0.478027 2.30098 0.478027 2.97598V4.74785C0.478027 5.39473 1.0124 5.95723 1.6874 5.95723H3.45928C4.10615 5.95723 4.66865 5.42285 4.66865 4.74785V2.94785C4.64053 2.30098 4.10615 1.7666 3.45928 1.7666ZM3.3749 4.66348H1.77178V3.03223H3.3749V4.66348Z"
                            fill="#DEE4EE"
                          />
                          <path
                            d="M7.22793 4.49492H16.8748C17.2123 4.49492 17.5217 4.21367 17.5217 3.84805C17.5217 3.48242 17.2404 3.20117 16.8748 3.20117H7.22793C6.89043 3.20117 6.58105 3.48242 6.58105 3.84805C6.58105 4.21367 6.89043 4.49492 7.22793 4.49492Z"
                            fill="#DEE4EE"
                          />
                          <path
                            d="M3.45928 7.53223H1.6874C1.04053 7.53223 0.478027 8.0666 0.478027 8.7416V10.5135C0.478027 11.1604 1.0124 11.7229 1.6874 11.7229H3.45928C4.10615 11.7229 4.66865 11.1885 4.66865 10.5135V8.7416C4.64053 8.0666 4.10615 7.53223 3.45928 7.53223ZM3.3749 10.4291H1.77178V8.79785H3.3749V10.4291Z"
                            fill="#DEE4EE"
                          />
                          <path
                            d="M16.8748 8.99512H7.22793C6.89043 8.99512 6.58105 9.27637 6.58105 9.64199C6.58105 10.0076 6.86231 10.2607 7.22793 10.2607H16.8748C17.2123 10.2607 17.5217 9.97949 17.5217 9.64199C17.5217 9.30449 17.2123 8.99512 16.8748 8.99512Z"
                            fill="#DEE4EE"
                          />
                          <path
                            d="M3.45928 13.6357H1.6874C1.04053 13.6357 0.478027 14.1701 0.478027 14.8451V16.617C0.478027 17.2639 1.0124 17.8264 1.6874 17.8264H3.45928C4.10615 17.8264 4.66865 17.292 4.66865 16.617V14.8451C4.64053 14.1701 4.10615 13.6357 3.45928 13.6357ZM3.3749 16.5326H1.77178V14.9014H3.3749V16.5326Z"
                            fill="#DEE4EE"
                          />
                          <path
                            d="M16.8748 15.0693H7.22793C6.89043 15.0693 6.58105 15.3506 6.58105 15.7162C6.58105 16.0818 6.86231 16.3631 7.22793 16.3631H16.8748C17.2123 16.3631 17.5217 16.0818 17.5217 15.7162C17.5217 15.3506 17.2123 15.0693 16.8748 15.0693Z"
                            fill="#DEE4EE"
                          />
                        </svg>
                        Task
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/task/list"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              List
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/task/kanban"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Kanban
                            </NavLink>
                            <VersionTag />
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Task --> */}

              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
                            fill=""
                          />
                          <path
                            d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
                            fill=""
                          />
                          <path
                            d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
                            fill=""
                          />
                          <path
                            d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
                            fill=""
                          />
                          <path
                            d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
                            fill="white"
                          />
                        </svg>
                        Forms
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/forms/form-elements"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Form Elements
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Form Layout
                            </NavLink>
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/forms/form-validation"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Form Validation
                            </NavLink>
                            <VersionTag />
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}
              <li>
                <NavLink
                  to="/tables"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Tables
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/pages' || pathname.includes('pages')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/pages' ||
                            pathname.includes('pages')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_2904_5875)">
                            <path
                              d="M14.2875 1.28857H3.7125C2.75625 1.28857 1.96875 2.07607 1.96875 3.03232V16.5323C1.96875 17.4886 2.75625 18.3042 3.74063 18.3042H14.3156C15.2719 18.3042 16.0875 17.5167 16.0875 16.5323V3.03232C16.0313 2.07607 15.2438 1.28857 14.2875 1.28857ZM14.7656 16.5323C14.7656 16.8136 14.5406 17.0386 14.2594 17.0386H3.7125C3.43125 17.0386 3.20625 16.8136 3.20625 16.5323V3.03232C3.20625 2.75107 3.43125 2.52607 3.7125 2.52607H14.2875C14.5688 2.52607 14.7938 2.75107 14.7938 3.03232V16.5323H14.7656Z"
                              fill="#DEE4EE"
                            />
                            <path
                              d="M12.797 3.39795H9.73135C9.2251 3.39795 8.80322 3.81982 8.80322 4.32607V8.03857C8.80322 8.54482 9.2251 8.9667 9.73135 8.9667H12.797C13.3032 8.9667 13.7251 8.54482 13.7251 8.03857V4.29795C13.697 3.81982 13.3032 3.39795 12.797 3.39795ZM12.4313 7.67295H10.0688V4.66357H12.4313V7.67295Z"
                              fill="#DEE4EE"
                            />
                            <path
                              d="M4.97822 5.1416H7.03135C7.36885 5.1416 7.67822 4.86035 7.67822 4.49473C7.67822 4.1291 7.39697 3.87598 7.03135 3.87598H4.9501C4.6126 3.87598 4.30322 4.15723 4.30322 4.52285C4.30322 4.88848 4.6126 5.1416 4.97822 5.1416Z"
                              fill="#DEE4EE"
                            />
                            <path
                              d="M4.97822 8.71367H7.03135C7.36885 8.71367 7.67822 8.43242 7.67822 8.0668C7.67822 7.70117 7.39697 7.41992 7.03135 7.41992H4.9501C4.6126 7.41992 4.30322 7.70117 4.30322 8.0668C4.30322 8.43242 4.6126 8.71367 4.97822 8.71367Z"
                              fill="#DEE4EE"
                            />
                            <path
                              d="M13.0782 11.02H4.97817C4.64067 11.02 4.3313 11.3013 4.3313 11.6669C4.3313 12.0325 4.61255 12.3138 4.97817 12.3138H13.0782C13.4157 12.3138 13.725 12.0325 13.725 11.6669C13.725 11.3013 13.4157 11.02 13.0782 11.02Z"
                              fill="#DEE4EE"
                            />
                            <path
                              d="M13.0782 14.5918H4.97817C4.64067 14.5918 4.3313 14.873 4.3313 15.2387C4.3313 15.6043 4.61255 15.8855 4.97817 15.8855H13.0782C13.4157 15.8855 13.725 15.6043 13.725 15.2387C13.725 14.873 13.4157 14.5918 13.0782 14.5918Z"
                              fill="#DEE4EE"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2904_5875">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.782227)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Pages
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/settings"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Settings
                            </NavLink>
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/pages/file-manager"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              File Manager
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/pages/data-tables"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Data Tables
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/pages/pricing-tables"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Pricing Tables
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/pages/error-page"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Error Page
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/pages/mail-success"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Mail Success
                            </NavLink>
                            <VersionTag />
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Pages --> */}
            </ul>
          </div>

          {/* <!-- Support Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              SUPPORT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Messages --> */}
              <li>
                <NavLink
                  to="/messages"
                  className={`group relative flex items-center justify-between rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M15.7499 3.48242H2.2499C1.29365 3.48242 0.478027 4.26992 0.478027 5.2543V14.3668C0.478027 15.323 1.26553 16.1387 2.2499 16.1387H15.7499C16.7062 16.1387 17.5218 15.3512 17.5218 14.3668V5.22617C17.5218 4.26992 16.7062 3.48242 15.7499 3.48242ZM15.7499 4.74805C15.778 4.74805 15.8062 4.74805 15.8343 4.74805L8.9999 9.13555L2.16553 4.74805C2.19365 4.74805 2.22178 4.74805 2.2499 4.74805H15.7499ZM15.7499 14.8168H2.2499C1.96865 14.8168 1.74365 14.5918 1.74365 14.3105V5.98555L8.3249 10.2043C8.52178 10.3449 8.74678 10.4012 8.97178 10.4012C9.19678 10.4012 9.42178 10.3449 9.61865 10.2043L16.1999 5.98555V14.3387C16.2562 14.6199 16.0312 14.8168 15.7499 14.8168Z"
                        fill="#DEE4EE"
                      />
                    </svg>
                    Messages
                  </div>
                  <NumberTag />
                </NavLink>
              </li>
              {/* <!-- Menu Item Messages --> */}

              {/* <!-- Menu Item Inbox --> */}
              <li>
                <NavLink
                  to="/inbox"
                  className={`group relative flex items-center justify-between rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                    >
                      <path
                        d="M16.8749 6.179C16.5374 6.179 16.228 6.46025 16.228 6.82588V12.1134C16.228 13.2103 15.4124 14.0821 14.3999 14.0821H3.5999C2.55928 14.0821 1.77178 13.2103 1.77178 12.1134V6.79775C1.77178 6.46025 1.49053 6.15088 1.1249 6.15088C0.759277 6.15088 0.478027 6.43213 0.478027 6.79775V12.0853C0.478027 13.8571 1.85615 15.3196 3.57178 15.3196H14.3999C16.1155 15.3196 17.4937 13.8853 17.4937 12.0853V6.79775C17.5218 6.46025 17.2124 6.179 16.8749 6.179Z"
                        fill="#DEE4EE"
                      />
                      <path
                        d="M8.5498 10.3696C8.6623 10.4821 8.83105 10.5665 8.9998 10.5665C9.16855 10.5665 9.30918 10.5103 9.4498 10.3696L12.8811 6.9665C13.1342 6.71338 13.1342 6.31963 12.8811 6.0665C12.6279 5.81338 12.2342 5.81338 11.9811 6.0665L9.64668 8.37275V0.891504C9.64668 0.554004 9.36543 0.244629 8.9998 0.244629C8.6623 0.244629 8.35293 0.525879 8.35293 0.891504V8.429L6.01855 6.09463C5.76543 5.8415 5.37168 5.8415 5.11855 6.09463C4.86543 6.34775 4.86543 6.7415 5.11855 6.99463L8.5498 10.3696Z"
                        fill="#DEE4EE"
                      />
                    </svg>
                    Inbox
                  </div>
                  <VersionTag />
                </NavLink>
              </li>
              {/* <!-- Menu Item Inbox --> */}

              {/* <!-- Menu Item Invoice --> */}
              <li>
                <NavLink
                  to="/invoice"
                  className={`group relative flex items-center justify-between rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_2904_5757)">
                        <path
                          d="M15.8343 3.229C15.8343 2.16025 14.9624 1.26025 13.8655 1.26025H4.13428C3.06553 1.26025 2.16553 2.13213 2.16553 3.229V17.3478C2.16553 17.5728 2.30615 17.7978 2.50303 17.9103C2.6999 18.0228 2.95303 17.9946 3.1499 17.8821L4.55615 16.954L6.44053 18.1915C6.66553 18.3321 6.91865 18.3321 7.14365 18.1915L8.9999 16.954L10.8562 18.1915C10.9687 18.2759 11.0812 18.304 11.1937 18.304C11.3062 18.304 11.4468 18.2759 11.5312 18.1915L13.3874 16.954L14.7937 17.9103C14.9905 18.0509 15.2437 18.0509 15.4405 17.9384C15.6374 17.8259 15.778 17.6009 15.778 17.3759L15.8343 3.229ZM14.0343 15.829C13.6687 15.5759 13.1905 15.5759 12.8249 15.829L11.2218 16.8978L9.61865 15.829C9.42178 15.7165 9.2249 15.6321 8.9999 15.6321C8.80303 15.6321 8.57803 15.6884 8.40928 15.829L6.80615 16.8978L5.20303 15.829C4.8374 15.5759 4.35928 15.5759 3.99365 15.829L3.45928 16.1665V3.229C3.45928 2.83525 3.76865 2.52588 4.1624 2.52588H13.9218C14.3155 2.52588 14.6249 2.83525 14.6249 3.229V16.1665L14.0343 15.829Z"
                          fill="#DEE4EE"
                        />
                        <path
                          d="M7.93106 4.52295H5.5123C5.1748 4.52295 4.89355 4.8042 4.89355 5.1417C4.89355 5.4792 5.1748 5.76045 5.5123 5.76045H7.93106C8.26856 5.76045 8.54981 5.4792 8.54981 5.1417C8.54981 4.8042 8.26856 4.52295 7.93106 4.52295Z"
                          fill="#DEE4EE"
                        />
                        <path
                          d="M12.3467 4.52295H11.6717C11.3342 4.52295 11.053 4.8042 11.053 5.1417C11.053 5.4792 11.3342 5.76045 11.6717 5.76045H12.3467C12.6842 5.76045 12.9655 5.4792 12.9655 5.1417C12.9655 4.8042 12.6842 4.52295 12.3467 4.52295Z"
                          fill="#DEE4EE"
                        />
                        <path
                          d="M5.5123 9.47285H7.05918C7.39668 9.47285 7.67793 9.1916 7.67793 8.8541C7.67793 8.5166 7.39668 8.23535 7.05918 8.23535H5.5123C5.1748 8.23535 4.89355 8.5166 4.89355 8.8541C4.89355 9.1916 5.14668 9.47285 5.5123 9.47285Z"
                          fill="#DEE4EE"
                        />
                        <path
                          d="M12.3467 8.20703H11.6717C11.3342 8.20703 11.053 8.48828 11.053 8.82578C11.053 9.16328 11.3342 9.44453 11.6717 9.44453H12.3467C12.6842 9.44453 12.9655 9.16328 12.9655 8.82578C12.9655 8.48828 12.6842 8.20703 12.3467 8.20703Z"
                          fill="#DEE4EE"
                        />
                        <path
                          d="M7.93106 11.8633H5.5123C5.1748 11.8633 4.89355 12.1445 4.89355 12.482C4.89355 12.8195 5.1748 13.1008 5.5123 13.1008H7.93106C8.26856 13.1008 8.54981 12.8195 8.54981 12.482C8.54981 12.1445 8.26856 11.8633 7.93106 11.8633Z"
                          fill="#DEE4EE"
                        />
                        <path
                          d="M12.3467 11.8633H11.6717C11.3342 11.8633 11.053 12.1445 11.053 12.482C11.053 12.8195 11.3342 13.1008 11.6717 13.1008H12.3467C12.6842 13.1008 12.9655 12.8195 12.9655 12.482C12.9655 12.1445 12.6842 11.8633 12.3467 11.8633Z"
                          fill="#DEE4EE"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2904_5757">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0 0.782227)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Invoice
                  </div>
                  <VersionTag />
                </NavLink>
              </li>
              {/* <!-- Menu Item Invoice --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <NavLink
                  to="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9801)">
                      <path
                        d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                        fill=""
                      />
                      <path
                        d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9801">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Chart
                </NavLink>
              </li>
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Ui Elements --> */}
              <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/ui' || pathname.includes('ui')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9807)">
                            <path
                              d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V7.53335C0.506348 8.4896 1.29385 9.2771 2.2501 9.2771H15.7501C16.7063 9.2771 17.4938 8.4896 17.4938 7.53335V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM16.2563 7.53335C16.2563 7.8146 16.0313 8.0396 15.7501 8.0396H2.2501C1.96885 8.0396 1.74385 7.8146 1.74385 7.53335V2.3021C1.74385 2.02085 1.96885 1.79585 2.2501 1.79585H15.7501C16.0313 1.79585 16.2563 2.02085 16.2563 2.3021V7.53335Z"
                              fill=""
                            />
                            <path
                              d="M6.13135 10.9646H2.2501C1.29385 10.9646 0.506348 11.7521 0.506348 12.7083V15.8021C0.506348 16.7583 1.29385 17.5458 2.2501 17.5458H6.13135C7.0876 17.5458 7.8751 16.7583 7.8751 15.8021V12.7083C7.90322 11.7521 7.11572 10.9646 6.13135 10.9646ZM6.6376 15.8021C6.6376 16.0833 6.4126 16.3083 6.13135 16.3083H2.2501C1.96885 16.3083 1.74385 16.0833 1.74385 15.8021V12.7083C1.74385 12.4271 1.96885 12.2021 2.2501 12.2021H6.13135C6.4126 12.2021 6.6376 12.4271 6.6376 12.7083V15.8021Z"
                              fill=""
                            />
                            <path
                              d="M15.75 10.9646H11.8688C10.9125 10.9646 10.125 11.7521 10.125 12.7083V15.8021C10.125 16.7583 10.9125 17.5458 11.8688 17.5458H15.75C16.7063 17.5458 17.4938 16.7583 17.4938 15.8021V12.7083C17.4938 11.7521 16.7063 10.9646 15.75 10.9646ZM16.2562 15.8021C16.2562 16.0833 16.0312 16.3083 15.75 16.3083H11.8688C11.5875 16.3083 11.3625 16.0833 11.3625 15.8021V12.7083C11.3625 12.4271 11.5875 12.2021 11.8688 12.2021H15.75C16.0312 12.2021 16.2562 12.4271 16.2562 12.7083V15.8021Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9807">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        UI Elements
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/ui/alerts"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Alerts
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/ui/buttons"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Buttons
                            </NavLink>
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/buttons-group"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Button Group
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/badge"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Badge
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/breadcrumb"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Breadcrumb
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/cards"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Cards
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/dropdowns"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Dropdowns
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/modals"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Modals
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/tabs"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Tabs
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/tooltips"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Tooltips
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/popovers"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Popovers
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/accordion"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Accordion
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/notifications"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Notifications
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/pagination"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Pagination
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/progress"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Progress
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/carousel"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Carousel
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/images"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Images
                            </NavLink>
                            <VersionTag />
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/ui/videos"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Videos
                            </NavLink>
                            <VersionTag />
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/auth' || pathname.includes('auth')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9814)">
                            <path
                              d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                              fill=""
                            />
                            <path
                              d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9814">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Authentication
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/auth/signin"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign In
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/auth/signup"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign Up
                            </NavLink>
                          </li>
                          <li className="flex justify-between px-4">
                            <NavLink
                              to="/auth/reset-password"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Reset Password
                            </NavLink>
                            <VersionTag />
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
