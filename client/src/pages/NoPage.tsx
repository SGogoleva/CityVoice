

const NoPage = () => {
  return (
    <>
  <div
    className="relative bg-cover bg-no-repeat bg-top bg-fixed flex items-center justify-center min-h-screen"
    style={{
      backgroundImage: "url('../../src/assets/citymain.webp')",
    }}
  >
    <div className="absolute inset-0 bg-[#1F3E52] opacity-70 z-0"></div>

    <div className="relative bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full z-10">
      <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Page not found. Sorry, we couldn’t find the page you’re looking for.
      </p>
      <a
        href="/"
        className="bg-[#50B04C] text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
      >
        Go to Homepage
      </a>
    </div>
  </div>
    </>
  );
};

export default NoPage;
