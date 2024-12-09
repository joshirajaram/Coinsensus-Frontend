import { useState } from 'react';
import axios from 'axios';
import { loginFields } from "../../utility/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

let fieldsState = {};
loginFields.forEach(field => fieldsState[field.id] = '');

export default function Login({ onAuthenticate }) {
    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticateUser();
    };

    const authenticateUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/login/${loginState.username}/${loginState.password}`);

            if (response.status === 200 && response.data) {
                console.log(response)
                if (response.data.success === true) {
                    localStorage.setItem('username', loginState.username);
                    onAuthenticate();
                    // alert(`Welcome back, ${loginState.username}!`);
                } else {
                    alert('Invalid password. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('User not found or invalid credentials. Please try again.');
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {loginFields.map(field => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
            </div>
            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}
