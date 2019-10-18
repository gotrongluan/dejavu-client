import React from 'react';
import LoadingPage from 'components/LoadingPage';
import { LOADING_PAGE_DELAY } from 'config/constants';

const asyncComponent = (getComponent) => {
    return class AsyncComponent extends React.Component {
        timeout = null
        state = {
            Component: null,
        }
        componentDidMount() {
            if (!this.state.Component) {
                this.timeout = setTimeout(() => {
                    getComponent().then(Component => {
                        this.setState({
                            Component
                        });
                    })
                }, LOADING_PAGE_DELAY);
            }
        }
        componentWillUnmount() {
            if (this.timeout)
                clearTimeout(this.timeout);
        }
        render() {
            const { Component } = this.state;
            if (false) {
                return <Component {...this.props} />;
            }
            return <LoadingPage />
        }
    };
};

export const asyncComponentFromPath = (component) => { 
    return asyncComponent(() => {
        return import(`pages/${component}`).then(module => module.default);
    });
};