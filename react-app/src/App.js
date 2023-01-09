import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import AllBiz from "./components/Home";
import ViewBiz from "./components/ViewBiz";
import EditListingFormPage from "./components/Form/EditListForm";
import { Redirect } from "react-router-dom";
import CreateBiz from "./components/Form/CreateBizForm";
function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const biz = useSelector((store) => store.business);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path="/biz" exact={true}>
                    <CreateBiz />
                </ProtectedRoute>
                <ProtectedRoute path="/biz/:bizId/edit" exact={true}>
                    {user?.id == biz?.userId ? (
                        <EditListingFormPage />
                    ) : (
                        <Redirect to="/" />
                    )}
                </ProtectedRoute>
                <ProtectedRoute path="/biz/:bizId" exact={true}>
                    <ViewBiz />
                </ProtectedRoute>

                <Route path="/" exact={true}>
                    <AllBiz />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
