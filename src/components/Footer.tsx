import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <Image src="/techgear-logo.png" alt="TechGear Logo" width={200} height={200} />
          </Link>
          <p>
            123 Digital Drive, <br />
            Silicon Valley, CA 94043 <br />
            United States
          </p>
          <span className="font-semibold">support@techgear.com</span>
          <span className="font-semibold">+1 (800) 123-4567</span>
          <div className="mt-4 font-semibold">Follow us on</div>
          <div className="flex gap-6 mt-2">
            <a href="https://www.facebook.com/TechGearOfficial" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/TechGearOfficial" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-600 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.youtube.com/TechGear" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-red-600 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/company/techgear" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-700 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://twitter.com/TechGearOfficial" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-500 text-2xl hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Affiliate Program</Link>
              <Link href="">Contact Support</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Laptops</Link>
              <Link href="">Smartphones</Link>
              <Link href="">TVs & Home Theater</Link>
              <Link href="">Gaming Consoles</Link>
              <Link href="">Accessories</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SUPPORT</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Customer Service</Link>
              <Link href="">Warranty & Repairs</Link>
              <Link href="">Find a Store</Link>
              <Link href="">Terms & Privacy</Link>
              <Link href="">Gift Cards</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Get the latest updates on new arrivals, tech trends, and exclusive deals!
          </p>
          <div className="flex">
            <input type="text" placeholder="Enter your email" className="p-4 w-3/4" />
            <button className="w-1/4 bg-blue-600 text-white">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            <Image src="/discover.png" alt="Discover" width={40} height={20} />
            <Image src="/skrill.png" alt="Skrill" width={40} height={20} />
            <Image src="/paypal.png" alt="PayPal" width={40} height={20} />
            <Image src="/mastercard.png" alt="MasterCard" width={40} height={20} />
            <Image src="/visa.png" alt="Visa" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div>
          © 2025 TechGear Inc. <br /> All rights reserved
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div>
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">English (US)</span>
          </div>
          <div>
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">₵ GHS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
