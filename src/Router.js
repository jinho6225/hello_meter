import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Home from './routes/Home';
import Profile from './routes/Profile';
import Detail from './routes/Detail';


const AppRouter = () => {
    return (
        <Router>
            <Switch>
                    <>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/profile'>
                            <Profile />
                        </Route>
                        <Route path='/detail/:id'>
                            <Detail />
                        </Route>

                    </>
            </Switch>
        </Router>
    )
}

export default AppRouter