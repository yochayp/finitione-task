import { TbEdit } from 'react-icons/tb';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import './TasksTable.css'

const TasksTable = ({ tasks, taskFormToggle, onDeleteTask, handleSortChange, order, orderBy }) => {
    return (
        <div className='mt-2'>
            <table className="table border shadow border-2 border-secondary rounded">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">
                            <div className="table-header" role="button" id='id' onClick={(e) => handleSortChange(e)}>
                                id
                                {orderBy === 'id' &&
                                    (order === 'asc' ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                            </div>
                        </th>
                        <th scope="col">
                            <div className="table-header" role="button" id='name' onClick={(e) => handleSortChange(e)}>
                                Task Name
                                {orderBy === 'name' &&
                                    (order === 'asc' ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                            </div>
                        </th>
                        <th scope="col">
                            <div className="table-header" role="button" id='destination_date' onClick={(e) => handleSortChange(e)}>
                                Date
                                {orderBy === 'destination_date' &&
                                    (order === 'asc' ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                            </div>
                        </th>
                        <th scope="col">
                            <div className="table-header" role="button" id='completed' onClick={(e) => handleSortChange(e)}>
                                Completed
                                {orderBy === 'completed' &&
                                    (order === 'asc' ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                            </div>
                        </th>
                        <th scope="col">
                            <button className="btn btn-primary" onClick={() => taskFormToggle()}>
                                Add New Task +
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length ?
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td scope="row">{task.id}</td>
                                <td scope="row">{task.name}</td>
                                <td scope="row">{task.destination_date}</td>
                                <td>
                                    <input className="form-check-input mt-0" type="checkbox" checked={task.completed ? 'checked' : ''} disabled />
                                </td>
                                <td scope="">
                                    <div className="client-buttons d-flex  justify-content-center">
                                        <button className="border-0 rounded-circle d-flex justify-content-center align-items-center" onClick={() => taskFormToggle(task)}>
                                            <TbEdit className="" value={{ color: 'blue', size: '50px' }} />
                                        </button>
                                        <button className=" border-0  d-flex justify-content-center align-items-center" onClick={() => onDeleteTask({ id: task.id })}>
                                            <RiDeleteBin6Line className="icon" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        :
                        <tr><td>not found any tasks</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TasksTable;