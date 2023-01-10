import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import AllBiz from "./components/Home";
import AllQuestions from "./components/Questions";
import MenuItems from "./components/Menu";
import AskQuestion from "./components/Questions/questionForm";
import AddItem from "./components/Menu/menuForm";
function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

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
                <Route path="/" exact={true}>
                    <AllBiz />
                </Route>
                <Route path="/biz/:bizId" exact={true}>
                    <AllQuestions />
                    <MenuItems />
                </Route>
                <Route path="/biz/:bizId/questions" exact={true}>
                    <AskQuestion />
                </Route>
                <Route path="/biz/:bizId/menu" exact={true}>
                    <AddItem />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
