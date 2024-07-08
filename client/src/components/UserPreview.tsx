import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useEffect } from "react";
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
  useEffect(() => {
    if (userId?.id) {
      dispatch(getUserThunk(userId.id));
    }
  }, [dispatch, isAuthenticated, userId?.id]);

  if (!isAuthenticated) {
    return <div>Please log in to see the user information.</div>;
  }

  return (
    <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full z-10 p-16">
      {user && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-left text-gray-800">
            Welcome, {user.name.firstName}, to your personal space!
          </h1>
          <h3 className="text-lg text-center text-gray-600">
            Here you can review your account details and see your messages or
            how many points you've earned!
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2">
          <div className="grid grid-cols-2 gap-4">
          <div className="text-lg font-semibold text-gray-700 ml-10">
                <p className="mb-2">Name:</p>
                <p className="mb-2">Email:</p>
                <p className="mb-2">City:</p>
                <p className="mb-2">Your earned points:</p>
              </div>
              <div className="text-lg text-gray-900">
                <p className="mb-2">{user.name.firstName} {user.name.lastName}</p>
                <p className="mb-2">{user.email}</p>
                <p className="mb-2">{user.city.cityName}</p>
                <p className="mb-2">{user.earnedPoints}</p>
              </div>
        </div>
            <div className="grid grid-cols-10 items-center justify-center w-full">
            <div className="col-span-8 mt-6">
                <ProgressBar
                    completed={`${user.earnedPoints}`}
                    bgColor="#4CAF50"
                    baseBgColor="#D6E9C6"
                    labelColor="#4CAF50"
                    labelAlignment="outside"
                    maxCompleted={1500}
                    height="18px"
                    borderRadius="10px"
                    className="progress-bar"
                />
            </div>
            <div className="col-span-2 flex justify-center items-center">
                <img src={reachPointImg} alt="" className="h-20 w-20" />
            </div>
        </div>
            <p className="text-lg font-semibold text-[#1F3E52]">
              Earn {1500 - user.earnedPoints} points to get to the next level and get more prizes!
            </p>
          </div>
        </div>
      )}
      {loading && <div>Loading user information...</div>}
    </div>
  );
};
export default UserPreview;
