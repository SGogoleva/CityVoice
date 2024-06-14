import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../src/assets/logo.png";
import { checkAuthThunk } from "../store/thunks/auth.thunk";
import LogoutButton from "./login-register/logout";

const NavLinks = ({ mobile }: { mobile: boolean }) => {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector((state) => state.auth.firstName);
  const linkClass = "text-sm font-semibold leading-6 text-gray-900";
  const mobileLinkClass =
    "block w-full px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50";
  const isAuthenticated = useAppSelector(
    (state) => state.isAuth.isAuthenticated
  );
  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);
  return (
    <>
      <NavLink className={mobile ? mobileLinkClass : linkClass} to="/">
        Main
      </NavLink>
      <NavLink className={mobile ? mobileLinkClass : linkClass} to="/projects">
        Projects
      </NavLink>
      <NavLink
        className={mobile ? mobileLinkClass : linkClass}
        to="/send-message"
      >
        Send Message
      </NavLink>
      <div>
        {isAuthenticated ? (
          <>
            <NavLink
              className={mobile ? mobileLinkClass : linkClass}
              to={"/personal"}
            >
              Personal Page
            </NavLink>
            <LogoutButton />
          </>
        ) : (
          <NavLink
            className={mobile ? mobileLinkClass : linkClass}
            to={"/login"}
          >
            {"Login →"}
          </NavLink>
        )}
      </div>
      {firstName && (
        <div>
          <p
            className={
              mobile
                ? "block w-full px-3 py-2 text-base font-semibold leading-7 text-gray-900"
                : "text-sm"
            }
          >
            Welcome, {firstName}!
          </p>
        </div>
      )}
    </>
  );
};

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="items-center hidden lg:flex lg:gap-x-12">
        <NavLinks mobile={false} />
      </div>
      <div className="lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">CityVoice</span>
              <img className="h-8 w-auto" src={Logo} alt="Logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLinks mobile={true} />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

const Header = () => {
  return (
    <header className="sticky bg-white w-full shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">CityVoice</span>
            <img className="h-8 w-auto" src={Logo} alt="Logo" />
          </a>
        </div>
        <Nav />
      </nav>
    </header>
  );
};

export default Header;
