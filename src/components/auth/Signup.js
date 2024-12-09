import { useState } from 'react';
import axios from 'axios';
import { signupFields } from "../../utility/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import * as ed from '@noble/ed25519';
import bs58 from 'bs58';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Signup({ onAuthenticate }) {
    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { publicKeyBase58, privateKeyBase58 } = await generateEd25519KeyPair();
        const updatedSignupState = {
            ...signupState,
            public_key: publicKeyBase58,
            private_key: privateKeyBase58,
        };
        console.log(updatedSignupState);
        createAccount(updatedSignupState);
    };

    async function generateEd25519KeyPair() {
        const privateKey = ed.utils.randomPrivateKey();
        const publicKey = await ed.getPublicKeyAsync(privateKey);
        const publicKeyBase58 = bs58.encode(publicKey);
        const privateKeyBase58 = bs58.encode(privateKey);
        return { publicKeyBase58, privateKeyBase58 };
    }

    const createAccount = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/createUser', data);
            if(response.data == "User already exists"){
                alert("User already exists, choose a different username!");
            }else{
                console.log('Account created successfully:', response.data);
                localStorage.setItem('username', signupState.username);
                
                onAuthenticate();
                // const message = "Welcome " + response.data[1];
                // alert(message);
                
            }
            
        } catch (error) {
            console.error('Error creating account:', error.response ? error.response.data : error.message);
            
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {fields.map(field => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signupState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
        </form>
    );
}
