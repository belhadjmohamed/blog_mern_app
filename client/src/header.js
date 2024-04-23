import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";
import { HiViewList } from "react-icons/hi";


export default function Header(){
    const {setUserInfo,userInfo} = useContext(UserContext);

    const [headerlist,setheaderlist] = useState(false)

    useEffect(() => {
      fetch('http://localhost:4000/profile',{
        credentials : 'include',
      }).then(response => {
        response.json().then(userInfo =>{
          setUserInfo(userInfo);
        });
      });
    },[]);

    function logout() {
      fetch('http://localhost:4000/logout', {
        credentials : 'include',
        method : 'POST',
      });
      setUserInfo(null);
    }

    const username =userInfo?.username;
    
    return (
      <header>
        <div className="headerlogo">
          <img src="/572-768x591.png" alt="log"/>
          <Link to='/' className='logo'>My Blog Site</Link>
        </div>
        <nav>
          {username && (
            <div className="headernav">
              <div className="iconlist">
                <HiViewList className="iconlistbtn" onClick={() => setheaderlist(!headerlist)}/>
                {headerlist && <div className="mobilelistnav">
                  <p><Link style={{ textDecoration: 'none', color: 'inherit' }} to={"/create"} >Create new post</Link></p>
                  <p><Link style={{ textDecoration: 'none', color: 'inherit' }} to={"/"} onClick={logout}>Logout</Link></p>
                </div>}
              </div>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to={"/create"}><p className="createnewpostnavbar">Create new post</p></Link>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to={"/"} onClick={logout}><p className="logoutnavbar">Logout</p></Link>
            </div>
          )}
          {!username && (
            <div className="headernav">
               <div className="iconlist">
                <HiViewList className="iconlistbtn" onClick={() => setheaderlist(!headerlist)} />
                {headerlist && <div className="mobilelistnav">
                  <p><Link style={{ textDecoration: 'none', color: 'inherit' }} to={"/login"} >Login</Link></p>
                  <p><Link style={{ textDecoration: 'none', color: 'inherit' }} to={"/register"} onClick={logout}>Register</Link></p>
                </div>}
              </div>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/login'><p className="createnewpostnavbar">Login</p> </Link> 
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/register'><p className="logoutnavbar"> Register</p></Link> 
            </div>
          )}
        </nav>
      </header>
    )
}
