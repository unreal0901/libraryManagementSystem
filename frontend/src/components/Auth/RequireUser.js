import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../features/user/UserSlice";
import { useGetMeQuery } from "../../services/api/UserApi";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
// import { userApi } from '../../redux/api/Userapi';

const RequireUser = ({ children }) => {
  const { isFetching, isLoading } = useGetMeQuery();
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();
  const user = useSelector(getUser);
  console.log(user);

  // const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
  //   skip: false,
  //   refetchOnMountOrArgChange: true,
  // });

  const loading = isLoading || isFetching;
  return (
    <>
      {loading ? (
        <FullScreenLoader />
      ) : cookies.logged_in && user ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireUser;
