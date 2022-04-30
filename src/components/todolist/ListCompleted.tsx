import ToDo from "./ToDo"
const ListCompleted = ({ tasks }: any) => {
    return (
        <ul className="list-group my-3">
            {
                tasks.map((task: any) => (
                    <ToDo key={task.id} task={task} />
                ))
            }
        </ul>
    )
}
export default ListCompleted