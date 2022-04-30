import { signOut } from "firebase/auth"
import { deleteDoc, doc } from "firebase/firestore"
import { Link } from "react-router-dom"
import { auth, firestore } from "../../database/Firebase"
import logo from '../../res/images/logo.png'

const Navbar = ({ tasks }: any) => {

    const onSignOut = () => {
        signOut(auth)
            .then(() => {
                alert('Tu es déconnecté !')
            }).catch((error) => {
                alert(error.message)
            })
    }

    const onDeleteTaskCompleted = async () => {
        tasks = tasks.filter((task: any) => task.completed)

        if (tasks.length === 0) {
            alert('Aucune tâches Terminées')
        } else{
            tasks.map(async (task: any) => {
                await deleteDoc(doc(firestore, "tasks", task.id))
            })
            alert('Tous les tâches Terminées seront supprimées ')
        }

            
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/todolist">
                    <img src={logo} className="img" alt="" width={30} />
                    <span className="ms-2">To Do List</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item" title="Tous les tâches">
                            <Link className="nav-link" aria-current="page" to="/todolist">
                                <i className="bi bi-list-task"></i>
                            </Link>
                        </li>
                        <li className="nav-item" title="Tâches Terminées">
                            <Link className="nav-link" to="/todolist/:completed">
                                <i className="bi bi-list-check"></i>
                            </Link>
                        </li>
                        <li className="nav-item" title="Supprimer les tâches Terminées">
                            <Link className="nav-link text-danger" to="#" onClick={onDeleteTaskCompleted}>
                                <i className="bi bi-trash"></i>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person"></i>
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                <li><Link className="dropdown-item" to="#" onClick={onSignOut}>Deconnexion</Link></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar