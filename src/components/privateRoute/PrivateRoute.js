import { Navigate } from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

export default function PrivateRoute({children}) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/"/>
    }
    return children;
}
