import { onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../database/Firebase"

import logo from '../../res/images/logo.png'

const VerificationEmail = () => {

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    navigate('/todolist')
                } 
            } else {
                navigate('/login')
            }
        })
    }, [navigate])

    const user = auth.currentUser!

    const sendVerification = () => {
        sendEmailVerification(user)
            .then(() => {
                alert('Email verification sent!')
                console.log('Email verification sent!')
                navigate('/login')
            })
            .catch((error)=>{
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
                    <h2 className="text-center">Verification d'email</h2>
                </div>
                <div className="card-body">
                    <p className="card-text text-center">
                        Un email de verification de compte a été envoyé à
                        <span className="text-primary"> {user?.email} </span>
                    </p>
                    <p className="text-center">
                        <button className="btn btn-warning btn-sm" onClick={sendVerification}>Réenvoyer l'email</button>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default VerificationEmail