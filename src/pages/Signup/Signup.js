import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.scss';

function Signup() {
    const [values, setValues] = useState({
        name: "",
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
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/login')
                })
                .catch(err => console.log(err));
        }
    }
    return (
        React.createElement('section', { className: 'sect2' },
            React.createElement('div', { className: 'form-box3' },
                React.createElement('div', { className: 'add-style2' },
                    React.createElement('h2', null, 'Sign up'),
                    React.createElement('form', { action: '', onSubmit: handleSubmit },
                        React.createElement('div', { className: 'mb-3' },
                            React.createElement('label', { htmlFor: 'name' }, React.createElement('strong', null, 'Name')),
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Enter Name',
                                name: "name",
                                onChange: handleInput,
                                className: 'form-control rounded-0'
                            }),
                            errors.name && React.createElement('span', { className: 'text-danger' }, errors.name)
                        ),
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
                            React.createElement('input', {
                                type: 'password',
                                placeholder: 'Enter Password',
                                name: "password",
                                onChange: handleInput,
                                className: 'form-control rounded-0'
                            }),
                            errors.password && React.createElement('span', { className: 'text-danger' }, errors.password)
                        ),
                        React.createElement('button', { className: 'btn btn-success w-100 rounded-0' }, 'Sign up'),
                        React.createElement('p', null),
                        React.createElement(
                            Link, { to: "/login", className: 'btn btn-default border w-100 bg-light rounded-0 text-decoration-none' },
                            'Login'
                        )
                    )
                )
            )
        )
    );
}

export default Signup;