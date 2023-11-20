import { useState } from "react";
export default function RegisterPage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    async function register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register',{
            method :'POST',
            body : JSON.stringify({username,password}),
            headers : {'Content-Type':'application/json'},
        });
        console.log(response);
        if (response.status === 200){
            alert('registration successful');
        }else {
            alert('registration failed');
        }

    }
    return(
            <div id="login-form-wrap">
                <h2>Register</h2>
                <form id="login-form" onSubmit={register}>
                    <p>
                        <input type='text' placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
                    </p>
                    <p>
                        <input type='password' placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    </p>
                    <p>
                        <button id='button_register'>Register</button>
                    </p>
                </form>
            </div>
    );
}