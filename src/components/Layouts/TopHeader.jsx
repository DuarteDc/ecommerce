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
            <a href="/" className="mx-3 text-sm ">
              <FaFacebookF/>
            </a>
            <a href="/" className="mx-3 text-sm">
              <FaInstagram/>
            </a>
            <a href="/" className="mx-3 text-sm">
                <FaTwitter/>
            </a>
            <a href="/" className="mx-3 text-sm">
                <FaYoutube/>
            </a>
          </div>
          <div className="flex justify-center">
              <p>Free shipping for standard order over $100</p>
          </div>
          <div className="flex justify-end mx-24">
            <Link href="/">
                <span  className="mx-3 text-sm">Blog</span>
            </Link>
            <Link href="/">
                <span className="mx-3 text-sm">Lenguage</span>
            </Link>
          </div>
          </div>
      </div>
    </div>
  );
};

export default TopHeader;
