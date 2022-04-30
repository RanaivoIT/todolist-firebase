import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../database/Firebase"
import logo from '../../res/images/logo.png'

const ResetPassword = () => {

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    navigate('/todolist')
                }
            }
        })
    }, [navigate])

    const [email, setEmail] = useState('')

    const sendPasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Un email de réinitialisation du mot de passe a été envoyé à ' + email)
                console.log('Un email de réinitialisation du mot de passe a été envoyé à ' + email)
                navigate('/login')
            })
            .catch((error) => {
                console.log(error.message)
                alert('Problème de connexion au serveur, réesayer plus tard')
            })
    }

    return (
        <div className="col-sm-6 mx-auto my-5">

            <div className="d-flex justify-content-center align-items-center mb-5" >
                <img src={logo} alt="logo" width={40} />
                <h1 className="ms-2">TO DO LIST</h1>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="text-center">Réinitialisation du mot de passe</h2>
                </div>
                <div className="card-body">
                    <form>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text" >
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input type="email" className="form-control" placeholder="Entrer votre email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-warning" onClick={sendPasswordReset} >Réinitialiser</button>
                        <p>
                            <p className="mt-3 text-center">
                                Retour à la page d'<Link to='/login'>authentification</Link>
                            </p>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword