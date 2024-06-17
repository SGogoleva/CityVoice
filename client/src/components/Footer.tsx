

const Footer = () => {


  return (
    <footer className='w-full px-6 py-6 text-sm text-white bg-[#1F3E52]'>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <h2 className="text-lg font-bold">CityVoice</h2>
          <span className="hidden md:block">|</span>
          <p className="mt-2 md:mt-0">{new Date().getFullYear()} &copy; All rights reserved</p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-0">
          <span className="text-white tracking-tight">
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          </span>
          <span className="text-white tracking-tight">
            <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
          </span>
        </div>
      </div>
    </footer>


  );
};

export default Footer;
