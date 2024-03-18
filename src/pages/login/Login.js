import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import './login.scss';
import { baseUrl2 } from "../../constants/url.constant";

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        const data = {
            email: values.email,
            password: values.password
        };

        axios
            .post(baseUrl2, data)
            .then((response) => navigate("/", { state: { message: "User Created Successfully!!!" } }))
            .catch((error) => alert("Error!"));
    }

    return (
        React.createElement('section', { className: 'sect' },
            React.createElement('div', { className: 'form-box2' },
                React.createElement('div', { className: 'add-style' },
                    React.createElement('h2', null, 'Login'),
                    React.createElement('form', {
                            action: '',
                            onSubmit: handleSubmit
                        },
                        React.createElement('div', { className: 'mb-3' },
                            React.createElement('label', { htmlFor: 'email' }, React.createElement('strong', null, 'Email')),
                            React.createElement('input', {
                                type: 'email',
                                placeholder: 'Enter Email',
                                name: "email",
                                onChange: handleInput,
                                className: 'form-control rounded-0'
                            }),
                            errors.email && React.createElement('span', { className: 'text-danger' }, errors.email)
                        ),
                        React.createElement('div', { className: 'mb-3' },
                            React.createElement('label', { htmlFor: 'password' }, React.createElement('strong', null, 'Password')),
                            React.createElement('input', { type: 'password', placeholder: 'Enter Password', name: "password", onChange: handleInput, className: 'form-control rounded-0' }),
                            errors.password && React.createElement('span', { className: 'text-danger' }, errors.password)
                        ),
                        React.createElement('button', { type: "submit", className: 'btn btn-success w-100 rounded-0' }, 'Log in'),
                        React.createElement('p', null),
                        React.createElement(
                            Link, { to: "/signup", className: 'btn btn-default border w-100 bg-light rounded-0 text-decoration-none' },
                            'Create Account'
                        )
                    )
                )
            )
        )
    );
}

export default Login;