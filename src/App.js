import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/login" component={Auth} />
                    <Route exact path="/signup" component={Auth} />
                    <Route exact path="/movies" component={Movie} />
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
