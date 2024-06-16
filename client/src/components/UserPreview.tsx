import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { getUserThunk } from "../store/thunks/user.thunk";

const UserPreview = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state: RootState) => state.user.user)
    const loading = useAppSelector((state: RootState) => state.user.loading)
    const isAuthenticated = useAppSelector((state: RootState) => state.isAuth.isAuthenticated)
    const userId = useAppSelector((state: RootState) => state.isAuth.user)
    useEffect(() => {
        if (userId?.id) {
            dispatch(getUserThunk(userId.id))
        }
    },[isAuthenticated])

    if (!isAuthenticated) {
        return <div>Please log in to see the user information.</div>;
    }

    return (
        <div>
        {user && (
            <div>
                <h1>Welcome, {user.name.firstName}, to your personal space!</h1>
                <h3>Here you can review your acoount details an see your messages or how many points you've earned!</h3>
                <p>Name: {user.name.firstName} {user.name.lastName}</p>
                <p>Email: {user.email}</p>
                <p>City: {user.city.cityName}</p>
                <p>How many votes have you participated: {user.projectId.length}</p>
                <p>Your earned points: {user.earnedPoints}</p>
            </div>
        )} 
        {loading && (
            <div>Loading user information...</div>
        )}
    </div>
    )
}
export default UserPreview