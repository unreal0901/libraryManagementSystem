import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/Logo.png";
import { useSelector } from "react-redux";
import { getUser } from "../../features/user/UserSlice";
import { Link, Outlet } from "react-router-dom";
import ProfileImg from "../../assets/profilePic.png";
import { useLogoutUserMutation } from "../../services/api/AuthApi";

const Topnav = () => {
  const user = useSelector(getUser).data[0];
  const [logout] = useLogoutUserMutation();
  console.log(user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileOpen(false);
  };

  const signoutHandler = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        closeProfileMenu();
      }
    };

    if (isProfileOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isProfileOpen]);

  return (
    <>
      <nav className="bg-[#805AD5]  relative" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#B285FF] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {/*
          Icon when menu is closed.

          Menu open: "hidden", Menu closed: "block"
        */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/*
          Icon when menu is open.

          Menu open: "block", Menu closed: "hidden"
        */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-left md:justify-center ml-[3rem] md:ml-[0]  sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src={Logo}
                  alt="Your Company"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src={Logo}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-[#B285FF] text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <a
                    href="#!"
                    className="bg-[#B285FF] text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  {user.role === "admin" ? (
                    <Link
                      to="students"
                      className="text-gray-300 hover:bg-[#B285FF] hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Students
                    </Link>
                  ) : null}

                  {user.role === "admin" ? (
                    <Link
                      to="add-books"
                      className="text-gray-300 hover:bg-[#B285FF] hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Add Books
                    </Link>
                  ) : null}

                  <Link
                    to="books"
                    className="text-gray-300 hover:bg-[#B285FF] hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Books
                  </Link>
                  {user.role === "admin" ? (
                    <Link
                      to="issuedBooks"
                      className="text-gray-300 hover:bg-[#B285FF] hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Issued Books
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex flex-col px-3 items-end">
                <p className="text-white text-[1rem] mb-.5">
                  Welcome {user.fullName.split(" ")[0]}
                </p>
                <p className="w-min rounded-full bg-[#B285FF] text-[.8rem] text-right text-white  px-3">
                  {user.role.toUpperCase()}
                </p>
              </div>

              {/* Profile dropdown */}
              <div className="relative ml-3" ref={profileMenuRef}>
                <div>
                  <button
                    type="button"
                    className="flex rounded-full border-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isProfileOpen ? "true" : "false"}
                    aria-haspopup="true"
                    onClick={toggleProfileDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        user.photo !== "default.png" ? user.photo : ProfileImg
                      }
                      alt=""
                    />
                  </button>
                </div>
                {/*
          Dropdown menu, show/hide based on menu state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        */}

                {isProfileOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    <a
                      href="#!"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#!"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                      onClick={signoutHandler}
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div
          className={`sm:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } relative`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2 absolute bg-[#805AD5]  w-full">
            {/* Current: "bg-[#B285FF] text-white", Default: "text-gray-300 hover:bg-[#B285FF] hover:text-white" */}
            <Link
              to="dashboard"
              className="bg-[#B285FF] text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </Link>
            {user.role === "admin" ? (
              <Link
                to="students"
                className="text-gray-300 hover:bg-[#B285FF] hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Students
              </Link>
            ) : null}
            <Link
              to="add-books"
              className="text-gray-300 hover:bg-[#B285FF] hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Books
            </Link>
            {user.role === "user" ? (
              <Link
                to="issuedBooks"
                className="text-gray-300 hover:bg-[#B285FF] hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Issued Books
              </Link>
            ) : null}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Topnav;
