import './Filters.css';

const Filters = ({ filter, handleFilterChange }) => {
    return (
        <div className="filters mt-5 d-flex">
            <div className="filterTab">
                <label htmlFor="endDate">Status</label>
                <select name="completed" value={filter.completed} onChange={handleFilterChange}>
                    <option value={''}>all</option>
                    <option value="true">completed</option>
                    <option value="false">not completed</option>
                </select>
            </div>
            <div className="filterTab mx-3">
                <label htmlFor="startDate">From Date</label>
                <input
                    name="startDate" type="date"
                    value={filter.startDate}
                    onChange={handleFilterChange} />
            </div>
            <div className="filterTab mx-3">
                <label htmlFor="endDate">To Date</label>
                <input
                    name="endDate" type="date"
                    value={filter.endDate}
                    onChange={handleFilterChange} />
            </div>
        </div>
    )
}

export default Filters;