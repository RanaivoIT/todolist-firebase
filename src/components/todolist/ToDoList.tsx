import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { auth } from "../../database/Firebase"
import AddTask from "./AddTask"
import List from "./List"
import Navbar from "./Navbar"

const ToDoList = ({ tasks }: any) => {

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    navigate('/verification')
                }
            } else {
                navigate('/login')
            }
        })
    }, [navigate])

    const params = useParams()

    if (params) {
        if (params.completed) tasks = tasks.filter((task: any) => task.completed)
    }

    return (
        <div className="col-sm-6 mx-auto my-3">

            <Navbar tasks={tasks} />
            <AddTask />
            {
                (tasks.length === 0) ? (
                    <div className="card">
                        <div className="card-body">
                            Aucune {(params.completed) ? ' tâches Terminées' : ' Tâche'}...
                        </div>
                    </div>
                ) :
                    <List tasks={tasks} />
            }

        </div>
    )
}
export default ToDoList