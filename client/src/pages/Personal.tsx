import UserPreview from "../components/UserPreview";

const PersonalPage = () => {
    return (
        <>
          <div className="container mt-4 text-sm min-h-screen">
            <h1 className="sr-only">Personal Page</h1>
            <UserPreview />
          </div>
        </>
      );
    }

export default PersonalPage