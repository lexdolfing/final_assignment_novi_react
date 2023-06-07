import './App.modules.css';
import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import DemoOverview from "./pages/demoOverview/DemoOverview";
import DropDemo from "./pages/dropDemo/DropDemo";
import RegisterAdmin from "./pages/registerAdmin/RegisterAdmin";
import RegisterUser from "./pages/registerUser/RegisterUser";
import ReplyToDemo from "./pages/replyToDemo/ReplyToDemo";
import SignIn from "./pages/signIn/SignIn";
import DJInfo from "./pages/DJInfo/DJInfo";
import ViewReply from "./pages/viewReply/ViewReply";
import {AuthContext} from "./contexts/AuthContext";
import SignOut from "./pages/signOut/SignOut";

function App() {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo-overview" element={<DemoOverview/>}/>
                <Route path="/drop-your-demo" element={<DropDemo/>}/>
                <Route path="/admin-registration" element={<RegisterAdmin/>}/>
                <Route path="/sign-up" element={<RegisterUser/>}/>
                <Route path="/reply-to-demo/:demoId" element={isAuthenticated ? <ReplyToDemo/> : <Navigate to="/"/> }/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path='/sign-out' element={<SignOut/>}/>
                <Route path="/user-info" element={isAuthenticated ? <DJInfo /> : <Navigate to="/" />} />
                <Route path={"/view-reply/:id"} element={isAuthenticated ? <ViewReply/> : <Navigate to="/" />}></Route>
            </Routes>
        </>
    );
}

export default App;
