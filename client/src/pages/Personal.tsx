import UserPreview from "../components/UserPreview";
import citymainImg from "../assets/citymain.webp";

const PersonalPage = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-no-repeat bg-top bg-fixed flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url('${citymainImg}')`,
        }}
      >
        <div className="absolute inset-0 bg-[#1F3E52] opacity-70 z-0"></div>
        <h1 className="sr-only">Personal Page</h1>
        <UserPreview />
      </div>
    </>
  );
};

export default PersonalPage;
