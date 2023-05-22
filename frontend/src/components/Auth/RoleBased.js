import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../features/user/UserSlice";
import { useEffect } from "react";

const RoleBased = ({ role, children }) => {
  const navigate = useNavigate();
  const user = useSelector(getUser)?.data;
  console.log(role, user[0]);

  useEffect(() => {
    if (user?.[0] && user[0]?.role !== role) {
      navigate("/app");
    }
  }, [navigate, user, role]);

  if (user?.[0] && user[0]?.role === role) {
    // User is already logged in and has the correct role
    return children;
  }

  return null;
};

export default RoleBased;
