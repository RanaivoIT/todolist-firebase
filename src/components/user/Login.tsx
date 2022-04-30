import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../database/Firebase"
import logo from '../../res/images/logo.png'

const Login = () => {

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    navigate('/todolist')
                } else {
                    navigate('/verification')
                }
            }
        })
    }, [navigate])


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitForm = () => {
        console.log('Authentification')
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user.email +' es connecté !')
                })
                .catch((error) => {
                    alert('Problème de connexion, verifier votre email ou mot de passe !')
                    console.log(error.message)
                })
        } else {
            alert('Veuillez remplir tous les champs')
        }

    }
    return (
        <div className="col-sm-4 mx-auto my-5">

            <div className="d-flex justify-content-center align-items-center mb-5" >
                <img src={logo} alt="logo" width={40} />
                <h1 className="ms-2">TO DO LIST</h1>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className=" text-center">Authentification</h2>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group mb-3">
                            <span className="input-group-text" >
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Entrer votre email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" >
                                <i className="bi bi-shield-lock"></i>
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Entrer votre mot de passe..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-outline-success" onClick={onSubmitForm}>Se connecter</button>
                    </form>
                    <p className="mt-3 text-center">
                        Je n'ai pas de compte, <Link to='/register'>m'inscrire</Link>
                    </p>
                    <p className="mt-3 text-center">
                        <Link to='/reset'>Mot de passe oublié ?</Link>
                    </p>

                    
                </div>
            </div>
        </div>
    )
}
export default Login