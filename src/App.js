import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Page404 from "./pages/404";

function App() {
    const { authenticated } = useSelector((store) => store.user);

    const AuthRoute = ({ ...props }) => {
        if (!authenticated) {
            return <Route {...props} />;
        } else return <Redirect to="/" />;
    };
    const ContentRoute = ({ ...props }) => {
        if (authenticated) {
            return <Route {...props} />;
        } else return <Redirect to="/login" />;
    };

    return (
        <Router>
            <Layout>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/movies/:id" component={Movie} />
                    <AuthRoute exact path="/login" component={Auth} />
                    <AuthRoute exact path="/signup" component={Auth} />
                    <Route path="*" component={Page404} />
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
