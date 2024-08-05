import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getUserThunk } from "../store/thunks/user.thunk";
import ProgressBar from "@ramonak/react-progress-bar";
import reachPointImg from "../assets/pointCollect.png";

const UserPreview = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const loading = useAppSelector((state: RootState) => state.user.loading);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.isAuth.isAuthenticated
  );
  const userId = useAppSelector((state: RootState) => state.isAuth.user);

  const [activeTab, setActiveTab] = useState('messages');


  useEffect(() => {
    if (userId?.id) {
      dispatch(getUserThunk(userId.id));
    }
  }, [dispatch, isAuthenticated, userId?.id]);

  if (!isAuthenticated) {
    return <div>Please log in to see the user information.</div>;
  }

  return (
    <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full z-10 p-16 m-20">
      {user && (
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-4">
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="h-20 w-20 rounded-full"
            />
            <h1 className="text-2xl font-bold text-left text-gray-800">
              {user.name.firstName}, welcome to your personal space!
            </h1>
          </div>
          <h3 className="text-m text-center text-gray-600">
            Here you can review your account details and see your messages or
            how many points you've earned!
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2 pl-10">
            <table className="min-w-full text-m">
              <tbody>
                <tr className="h-10">
                  <td>First name:</td>
                  <td>{user.name.firstName}</td>
                </tr>
                <tr className="h-10">
                  <td>Second name:</td>
                  <td>{user.name.lastName}</td>
                </tr>
                <tr className="h-10">
                  <td>Phone:</td>
                  <td>{user.phone}</td>
                </tr>
                <tr className="h-10">
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr className="h-10">
                  <td>Date of birth:</td>
                  <td>
                    {new Date(user.DOB).toLocaleDateString()}
                  </td>
                </tr>
                <tr className="h-10">
                  <td>City:</td>
                  <td>{user.city}</td>
                </tr>
              </tbody>
            </table>
            <div className="grid grid-cols-10 items-center justify-center w-full">
              <div className="col-span-8 mt-6">
                <ProgressBar
                  completed={`Your earned points: ${user.earnedPoints}`}
                  bgColor="#4CAF50"
                  baseBgColor="#D6E9C6"
                  labelColor="#4CAF50"
                  labelAlignment="outside"
                  maxCompleted={2000}
                  height="18px"
                  borderRadius="10px"
                  className="progress-bar"
                />
                <p className="text-sm font-semibold text-[#1F3E52] mt-2">
                  Earn +{2000 - user.earnedPoints} points to get to the next
                  level and get more prizes!
                </p>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <img src={reachPointImg} alt="" className="h-20 w-20" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-2 px-4 ${
                    activeTab === 'messages' ? 'text-orange-500 border-b-2 border-orange-500' : ''
                  }`}
                  onClick={() => setActiveTab('messages')}
                >
                  Messages
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === 'projects' ? 'text-orange-500 border-b-2 border-orange-500' : ''
                  }`}
                  onClick={() => setActiveTab('projects')}
                >
                  Projects
                </button>
              </div>
              <div className="mt-4">
                {activeTab === 'messages' && (
                  <div>
                    <ul className="list-disc list-inside">
                      {user.messageId.map((message, index) => (
                        <li key={index} className="text-gray-700">{message}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'projects' && (
                  <div>
                    <ul className="list-disc list-inside">
                      {user.projectId.map((project, index) => (
                        <li key={index} className="text-gray-700">{project}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && <div>Loading user information...</div>}
    </div>
  );
};
export default UserPreview;
