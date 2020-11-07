import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Home from './routes/Home';
import ContactUs from './routes/ContactUs';
import Privacy from './routes/Privacy';
import BarDateDetail from './routes/BarDateDetail';
import BarDayDetail from './routes/BarDayDetail';
import StackedDateDetail from './routes/StackedDateDetail';
import StackedDayDetail from './routes/StackedDayDetail';
import Navigation from './components/Navigation';


const AppRouter = () => {
    return (
        <Router>
            <Navigation />
            <Switch>
                    <>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/contactus'>
                            <ContactUs />
                        </Route>
                        <Route path='/privacy-policy'>
                            <Privacy />
                        </Route>                        
                        <Route path='/bar-date-detail/:id'>
                            <BarDateDetail />
                        </Route>
                        <Route path='/bar-day-detail/:id'>
                            <BarDayDetail />
                        </Route>
                        <Route path='/stack-date-detail/:id'>
                            <StackedDateDetail />
                        </Route>
                        <Route path='/stack-day-detail/:id'>
                            <StackedDayDetail />
                        </Route>
                    </>
            </Switch>
        </Router>
    )
}

export default AppRouter