import './Statistics.css'

const Statistics = ({ totalTasks, tasksCompleted }) => {
    return (
        <div className="statistics m-5 d-flex flex-row">
            <div className="statistics-tab d-flex shadow mx-1">
                <div className=" rounded-start tab-start">
                    Total Tasks
                </div>
                <div className="total-tasks tab-end rounded-end">
                    {totalTasks}
                </div>
            </div>
            <div className="statistics-tab d-flex shadow mx-1">
                <div className="tab-start rounded-start">
                    Tasks Completed
                </div>
                <div className="completed-tasks  tab-end  rounded-end">
                    {tasksCompleted}
                </div>
            </div>
            <div className="statistics-tab d-flex shadow mx-1">
                <div className="tab-start rounded-start">
                    Tasks Remaining
                </div>
                <div className="remaining-tasks  tab-end  rounded-end">
                    {totalTasks-tasksCompleted}
                </div>
            </div>
        </div>
    )
}

export default Statistics;