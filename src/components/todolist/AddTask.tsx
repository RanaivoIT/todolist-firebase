import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { auth, firestore } from "../../database/Firebase"

const AddTask = () => {

    const [name, setName] = useState('')

    const onAddTask = async () => {
        if (name) {
            const task = {
                date: Date.now(),
                name: name,
                completed: false,
                user_id: auth.currentUser?.uid
            }
            await addDoc(collection(firestore, "tasks"), task)
                .then(() => {
                    setName('')
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }else{
            alert('Veuillez remplir le champs')
        }
    }

    return (
        <form className="my-3">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Nouvêlle tâche..."
                    value={name} onChange={e => setName(e.target.value)}
                />
                <button type="button" className="btn btn-outline-primary " onClick={onAddTask}>
                    <i className="bi bi-plus text-lg"></i>
                </button>
            </div>
        </form>

    )
}
export default AddTask