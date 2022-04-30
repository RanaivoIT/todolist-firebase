import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { auth } from "../../database/Firebase"
import logo from '../../res/images/logo.png'

const Register = () => {

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    navigate('/list')
                } else {
                    navigate('/verification')
                }
            } 
        })
    }, [navigate])


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const validationEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    const onSubmitForm = () => {
        console.log('Inscription')

        if (email && password && confirmPassword) {
            if (validationEmail(email)) {
                if (password.length < 6) {
                    alert('Votre mot de passe ne doit pas être inférieur à 6 caractères !')
                } else {
                    if (password === confirmPassword) {
                        createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                const user = userCredential.user
                                sendEmailVerification(user)
                                    .then(() => {
                                        console.log('Email verification sent!')
                                    })
                                console.log(user.email + ' a été créé !')
                                alert('Votre compte avec "' + user.email + '" a été créé !')
                            })
                            .catch((error) => {
                                console.log(error.message)
                                alert('Problème de connexion au serveur, réesayer plus tard')
                            })
                    } else {
                        alert('Les mots de passe ne se correspondent pas')
                    }

                }
            } else {
                alert('Verifier votre email !')
            }
        } else {
            alert('Tous les champs doivent être remplis !')
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
                    <h2 className="text-center">Inscription</h2>
                </div>
                <div className="card-body">
                    <form >
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
                        <div className="input-group mb-3">
                            <span className="input-group-text" >
                                <i className="bi bi-shield-lock"></i>
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Confirmer votre mot de passe..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" onClick={onSubmitForm} className="btn btn-outline-success">S'inscrire</button>
                    </form>

                    <p className="mt-3 text-center">
                        J' ai un compte, <Link to='/login'>m'authentifier</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Register