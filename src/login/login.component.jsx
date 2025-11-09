import "./login.component.css"
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const LoginComponent = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        try {
            const credentials = { email, password };
            await login(credentials);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }



    


}

return (
        <>
            <div className="login-parent">

                <div className="card login-card">
                    <div className="card-body">
                        <div className="login-logo">

                            <img
                                src='/logo.svg'
                                width="100"
                                height="100"
                            />

                        </div>

                        <div className="login-header-text">
                        <h3>University Inventory</h3>

                        </div>


                    <div className="credential">
                        <div class="mb-3">
                            <label for="emailFormControlInput" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="emailFormControlInput" placeholder="University Email" required
                                onChange={(e) => handleEmailInput(e)}
                            />
                        </div>

                        <div class="mb-3">
                            <label for="passwordFormControlInput1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="passwordFormControlInput1" placeholder="Password" required 
                                onChange={(e) => handlePasswordInput(e)}
                            />
                        </div>
                    </div>

                    <div className="login-button-section">
                        <button className="btn btn-primary login-button" type="submit"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>

                    </div>
                </div>
            </div>
        </>
    )

}        