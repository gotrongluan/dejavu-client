import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { asyncComponentFromPath } from 'utils/asyncComponent';

export const routeRender = (route) => {
    if (route.redirect) {
        if (route.path)
            return <Redirect exact from={route.path} to={route.redirect} />;
        return <Redirect to={route.redirect} />;
    }
    if (!route.path) {
        if (route.component)
            return <Route component={asyncComponentFromPath(route.component)} />;
    }
    else {
        if (route.routes) {
            return (
                <Route
                    path={route.path}
                    render={({ match }) => (
                        <Switch>
                            {route.routes.map(r => {
                                let pathObj = {};
                                if (r.path !== undefined)
                                    pathObj.path = `${match.path}${r.path}`;
                                return routeRender({ ...r, ...pathObj });
                            })}
                        </Switch>
                    )}
                />);
        }
        else if (route.component) {
            return (
                <Route exact path={route.path} component={asyncComponentFromPath(route.component)} />
            );
        }
    }
    return null;
};