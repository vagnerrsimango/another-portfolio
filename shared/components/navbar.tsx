import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu } from 'react-feather';
import { NavLinks } from '@constants';

type Props = {
  href: string;
  title: string;
};

const NavItem = ({ href, title }: Props): JSX.Element => {
  const router = useRouter();
  return (
    <Link href={href}>
      <li className={`${router.pathname === href ? 'border-b-2' : ''} px-5 pb-1 cursor-pointer`}>
        <p className="cursor-pointer transition duration-500 ease-in-out transform md:hover:-translate-y-2 text-white font-bold md:hover:text-violet">
          {title}
        </p>
      </li>
    </Link>
  );
};

const Navbar = (): JSX.Element => {
  const [isNavShadowVisible, setisNavShadowVisible] = useState(false);

  const addShadowtoNav = () => {
    if (window.scrollY >= 100) {
      setisNavShadowVisible(true);
    } else {
      setisNavShadowVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', addShadowtoNav);
    return () => {
      window.removeEventListener('scroll', addShadowtoNav);
    };
  }, []);
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <div className={`${isNavShadowVisible ? 'shadow-2xl' : ''} mx-auto bg-blue w-full fixed z-50`}>
      <nav className="block md:flex justify-between items-center p-2 pl-5">
        {/* Navbar Logo */}
        <div className="flex justify-between">
          <div>
            <Link href="/">
              <img
                src="/images/logo-light.svg"
                alt="e"
                className="pl-30 my-2 cursor-pointer w-1/5 md:w-2/5 transition-all transform hover:scale-75"
              />
            </Link>
          </div>
          <div className="flex md:hidden mr-6">
            <button
              type="button"
              className="text-white focus:outline-none"
              onClick={() => setShowMobileNav(!showMobileNav)}>
              <Menu size={18} />
            </button>
          </div>
        </div>
        <div className={showMobileNav ? 'block pt-3 transition-all' : 'hidden md:block '}>
          {/* Navbar Items */}
          <ul className="md:flex md:flex-row pr-10 border-pink border-2 md:border-none">
            {NavLinks.map((item) => {
              return <NavItem title={item.title} href={item.href} key={item.href} />;
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
