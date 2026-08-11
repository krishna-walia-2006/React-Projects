import {useState,useContext} from "react";
import UserContext from "../../context/UserContext";

function Login() {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");


    const {setuser} = useContext(UserContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        setuser({username,password});
    }
    return (
        <div>
            <h2>Login</h2>
            <input style={{ marginRight: "10px" }} type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Enter your username" />
            
            <input type="text" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password" />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Login