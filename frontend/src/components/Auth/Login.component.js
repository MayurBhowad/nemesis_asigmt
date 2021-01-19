import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup.common';

import { LoginFunction } from '../../functions/Login.functions';
import { loginUser } from '../../redux/actions/user.action';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            name: this.state.name,
            password: this.state.password
        }
        // this.props.loginUser(userData);
        this.props.loginUser(userData, this.props.history);
    }

    render() {

        const { error } = this.props.user;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to Dashboard</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={error.name}
                                />

                                <TextFieldGroup
                                    placeholder="password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={error.password}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { loginUser })(Login);
// export default Login;