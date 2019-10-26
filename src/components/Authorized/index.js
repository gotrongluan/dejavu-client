import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import storage from 'utils/storage';
import * as globalActions from '_redux/actions/global';
import LoadingPage from 'components/LoadingPage';

class Authorized extends React.PureComponent {
    state = {
        isAuthorized: 'pending',
    }
    
    componentDidMount() {
        const { user, fetchUser } = this.props;
        if (!_.isEmpty(user)) {
            this.setState({ isAuthorized: 'authenticated' });
        }
        else {
            const token = storage.getToken();
            if (!token) {
                this.setState({
                    isAuthorized: 'failed',
                });
            }
            else fetchUser();
        }
    }

    componentDidUpdate(prevProps) {
        const { user } = this.props;
        const { prevUser } = prevProps;
        if (!_.isEmpty(user) && _.isEmpty(prevUser))
            this.setState({
                isAuthorized: 'authenticated',
            });
    }

    render() {
        const { children, location } = this.props;
        const { isAuthorized } = this.state;
        if (isAuthorized === 'pending') return <LoadingPage />;
        if (isAuthorized === 'authenticated') return children;
        return (
            <Redirect
                to={{
                    pathname: '/user/login',
                    state: {
                        from: location
                    }
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.global.user,
});

const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(globalActions.fetchUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authorized));