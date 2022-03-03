import Link from "next/link";
import { useEffect,useState } from "react";
import {FaFacebookF , FaInstagram , FaTwitter , FaYoutube} from "react-icons/fa";

const TopHeader = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div className="bg-white-dg py-3 hidden lg:block 2xl:block relative z-20 w-full">
      <div className="w-full mr-auto ml-auto ">
          <div className="grid grid-cols-3">
          <div className="flex justify-start mx-24 divide-x">
            <Link href="/">
            <a className="mx-3 text-sm ">
              <FaFacebookF/>
            </a>
            </Link>
            <Link href="/">
            <a className="mx-3 text-sm">
              <FaInstagram/>
            </a>
            </Link>
            <Link href="/">
            <a className="mx-3 text-sm">
                <FaTwitter/>
            </a>
            </Link>
            <Link href="/">
            <a className="mx-3 text-sm">
                <FaYoutube/>
            </a>
            </Link>
          </div>
          <div className="flex justify-center">
              <p>Free shipping for standard order over $100</p>
          </div>
          <div className="flex justify-end mx-24">
            <Link href="/">
                <a  className="mx-3 text-sm">Blog</a>
            </Link>
            <Link href="/">
                <a className="mx-3 text-sm">Lenguage</a>
            </Link>
          </div>
          </div>
      </div>
    </div>
  );
};

export default TopHeader;
