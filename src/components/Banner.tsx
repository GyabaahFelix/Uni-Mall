'use client';

const companyLogos = [
  { src: '/brands/intel.png', alt: 'Intel' },
  { src: '/brands/samsung.png', alt: 'Samsung' },
  { src: '/brands/sony.png', alt: 'Sony' },
  { src: '/brands/dell.png', alt: 'Dell' },
  { src: '/brands/hp.png', alt: 'HP' },
  { src: '/brands/asus.png', alt: 'Asus' },
  { src: '/brands/lenovo.png', alt: 'Lenovo' },
  { src: '/brands/alienware.png', alt: 'Alienware' },
  { src: '/brands/acer.png', alt: 'Acer' },
  { src: '/brands/lg.png', alt: 'LG' },
  { src: '/brands/logitech.png', alt: 'Logitech' },
];

const Banner = () => {
  return (
    <section className="bg-gray-100 py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap justify-start gap-8 items-center">
          {companyLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
              <img
                src={logo.src}
                alt={logo.alt}
                width={70} // Adjust the width and height as needed
                height={50}
                className="transition-transform duration-500 hover:scale-110 hover:rotate-3"
              />
            </div>
          ))}

          {/* 'And many more' rounded object with animation */}
          <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 text-center text-sm font-semibold text-gray-600 transform transition-all duration-500 hover:scale-125 hover:rotate-12 animate-pulse">
            And many more
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
