import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch, NavLink } from 'react-router-dom'
import { Dummy, Home, Login } from '../components';
import '../index.css';

function Routing() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/dummy">Dummy</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/orders">Map</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/dummy" component={Dummy} />
                    <Route path="/orders" component={Login} />
                    <Route component={Home} />
                </Switch>
            </div>
        </Router>
    )
}

export {
    Routing
};