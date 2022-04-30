import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import moment from "moment"
import 'moment/locale/fr'
import { firestore } from "../../database/Firebase"

const ToDo = ({ task }: any) => {

    const onToggleCompleted = async () => {
        await updateDoc(doc(firestore, "tasks", task.id), {
            completed: !task.completed
        })
    }
    const onDeleteTask = async () => {
        alert('"'+task.name+'" est supprimé')
        await deleteDoc(doc(firestore, "tasks", task.id))
    }

    moment.locale('fr')

    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="me-auto">
                <p className="m-0">{task.name}</p>
                <p className="m-0 text-secondary">{(moment(task.date)).format('DD MMM YYYY, HH:mm:ss')}</p>
            </div>
            <div className="btn-group ms-auto ">
                <button className={"btn " + (!task.completed ? 'btn-outline-success' : 'btn-success')} onClick={onToggleCompleted} title={(task.completed) ? 'Incomplet' : 'Complet'}>
                    <i className="bi bi-check-lg"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={onDeleteTask} title="Supprimer">
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </li>
    )
}
export default ToDo