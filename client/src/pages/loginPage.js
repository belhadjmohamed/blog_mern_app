import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../userContext";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login',{
            method : 'POST',
            body : JSON.stringify({username,password}),
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
        });
        if (response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        }else {
            alert('wrong credentials');
        }
    }

    if (redirect){
        return <Navigate to={'/'} />
    }
    return(   
        <div id="login-form-wrap">
                <h2>Login</h2>
                <form id="login-form" onSubmit={login}>
                    <p>
                    <input type='text' placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
                    </p>
                    <p>
                    <input type='password' placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    </p>
                    <p>
                    <button id='button'>Login</button>
                    </p>
                </form>
                <div id="create-account-wrap">
                    <p>Not a member? <Link to='/register'> Create Account</Link></p>
                </div>
        </div>
    );
}
