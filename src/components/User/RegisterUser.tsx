import { useState } from "react"
import { AuthService } from "../../services/AuthService";

const Register = () => {
    const [userData, setUserData] = useState ({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        country: ''
    });

    const handleInputchange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        try {
            const token = await AuthService.register(userData);
            console.log("Registro exitoso", token);
        } catch (error) {
            console.log("Error al registrarse:");
        }        
    };

    return (
        <div>
            <h2>Registro</h2>
            <form>
                <label>Nombre de usuario: 
                <input type="email" name="username" onChange={handleInputchange}/>
                </label>
                <br/>
                <label>Contraseña:
                <input type="password" name="password" onChange={handleInputchange}/>
                </label>
                <br/>
                <label>Nombre:
                <input type="text" name="firstname" onChange={handleInputchange}/>
                </label>
                <br/>
                <label>Apellido:
                <input type="text" name="lastname" onChange={handleInputchange}/>
                </label>
                <br/>
                <label>Pais:
                <input type="text" name="country" onChange={handleInputchange}/>
                </label>
                <br/>
                <button type="button" onClick={handleRegister}>Registrarse</button>
            </form>
        </div>
    );
};

export default Register;

