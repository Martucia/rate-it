import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../actions/redux";


const AuthRequire = ({ children }: any) => {
    const { pathname } = useLocation();
    const isAuth = useAppSelector(state => state.userReducer.isAuth);

    if (isAuth === false) {
        return <Navigate to='/login' state={{ from: pathname }} />
    }

    return children;
}

export default AuthRequire;