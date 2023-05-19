import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../../features/user/UserSlice";
import { useGetMeQuery } from "../../services/api/UserApi";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
// import { userApi } from '../../redux/api/Userapi';

const RequireUser = ({ children }) => {
  const navigate = useNavigate();
  const { isFetching, isLoading } = useGetMeQuery();
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();
  console.log(location);
  const user = useSelector(getUser)?.data;

  if (isLoading || isFetching) {
    // Loading state, show loader
    return <FullScreenLoader />;
  }

  if (cookies.logged_in && user) {
    // User is already logged in
    return children;
  } else return null;
};

export default RequireUser;
