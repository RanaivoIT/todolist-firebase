import { onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { auth, firestore } from "../database/Firebase"
import ToDoList from "./todolist/ToDoList"
import Login from "./user/Login"
import Register from "./user/Register"
import VerificationEmail from "./user/VerificationEmail"
import ResetPassword from "./user/ResetPassword"

const App = () => {

    const [tasks, setTasks] = useState<any[]>([])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                onSnapshot(
                    query(collection(firestore, "tasks"), where("user_id", "==", user.uid), orderBy("date", "desc")),
                    (querySnapshot) => {
                        let tasksFireBase: any[] = []
                        querySnapshot.forEach((doc) => {
                            const task = {
                                id: doc.id,
                                date: doc.data().date,
                                name: doc.data().name,
                                completed: doc.data().completed,
                                user_id: doc.data().user_id
                            }
                            tasksFireBase.push(task)
                        })
                        setTasks(tasksFireBase)
                    })
            }
        })
    }, [])


    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/todolist/' element={<ToDoList tasks={tasks} />} />
                    <Route path='/todolist/:completed' element={<ToDoList tasks={tasks} />} />
                    <Route path='/verification' element={<VerificationEmail />} />
                    <Route path='/reset' element={<ResetPassword />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App