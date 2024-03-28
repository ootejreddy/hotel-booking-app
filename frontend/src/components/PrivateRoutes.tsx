import { PropsWithChildren, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
type privateRouteProps = PropsWithChildren;

const PrivateRoutes = ({ children }: privateRouteProps) => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default PrivateRoutes;
