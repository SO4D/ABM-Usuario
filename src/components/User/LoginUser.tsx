import { useState } from "react"
import { AuthService } from "../../services/AuthService";

const Login = () => {
    const [loginData, setLoginData] = useState ({
        username: '',
        password: '',
    });

    const handleInputchange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        try {
            const token = await AuthService.login(loginData);
            console.log("Inicio de sesión exitoso!", token);
        } catch (error) {
            console.log("Error al iniciar sesión:");
        }
    };

    return (
        <div>
            <h2>Iniciar sesion</h2>
            <form>
                <label>Username:
                <input type="email" name="username" onChange={handleInputchange}/>
                </label>
                <br/>
                <label>Contraseña:
                <input type="password" name="password" onChange={handleInputchange}/>
                </label>
                <br/>
                <button type="button" onClick={handleLogin}>Iniciar sesion</button>
            </form>
        </div>
    );
};

export default Login;