import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import DemoOverview from "./pages/demoOverview/DemoOverview";
import DropDemo from "./pages/dropDemo/DropDemo";
import RegisterAdmin from "./pages/registerAdmin/RegisterAdmin";
import RegisterUser from "./pages/registerUser/RegisterUser";
import ReplyToDemo from "./pages/replyToDemo/ReplyToDemo";
import SignIn from "./pages/signIn/SignIn";
import UserInfo from "./pages/userInfo/UserInfo";
import ViewReply from "./pages/viewReply/ViewReply";
import {AuthContext} from "./contexts/AuthContext";
import SignOut from "./pages/signOut/SignOut";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo-overview" element={<PrivateRoute><DemoOverview/></PrivateRoute>}/>
                <Route path="/drop-your-demo" element={<DropDemo/>}/>
                <Route path="/admin-registration" element={<RegisterAdmin/>}/>
                <Route path="/sign-up" element={<RegisterUser/>}/>
                <Route path="/reply-to-demo/:demoId" element={<PrivateRoute><ReplyToDemo/></PrivateRoute>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path='/sign-out' element={<SignOut/>}/>
                <Route path="/user-info" element={<PrivateRoute><UserInfo /></PrivateRoute>} />
                <Route path={"/view-reply/:id"} element={<PrivateRoute><ViewReply/></PrivateRoute>}/>
            </Routes>
        </>
    );
}

export default App;
