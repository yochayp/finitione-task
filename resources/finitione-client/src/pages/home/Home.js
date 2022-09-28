import React, { useState, useEffect } from "react";
import useModal from "../../components/modal/useModal";
import Modal from "../../components/modal/Modal";
import TasksTable from "../../components/tasksTable.js/TasksTable";
import { fetchTasks, addTask, deleteTask, updateTask } from "../../api/api";
import Statistics from "../../components/statistics/Statistics";
import Filters from "../../components/filters/Filters";
import Paginator from "../../components/paginator/Paginator";

function Home() {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [totalTasks, setTotalTasks] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [filter, setFilter] = useState({});
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [tpp, setTpp] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [links, setLinks] = useState([]);
  const { isShowing, toggleModal } = useModal();

  useEffect(() => {
    initTasks();
  }, [filter, orderBy, order, page])

  const initTasks = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetchTasks(filter, orderBy, order, page, tpp);
      setTasksData(data);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }

  const setTasksData = (data) => {
    setLinks(data.tasks.links)
    setTasksCompleted(data.completedTasksAmount);
    setTotalTasks(data.tasksAmount);
    setTasks(data.tasks.data);
    const lenght = data.tasks.links.length - 2;
    setTotalPages(lenght)
  }

  const handleSortChange = (e) => {
    const sortName = e.target.id;
    if (orderBy === sortName) {
      if (order === 'asc') setOrder('desc');
      else setOrder('asc');
    } else {
      setOrderBy(sortName);
    }
  }

  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === '') {
      const { [name]: removedProperty, ...rest } = filter;
      setFilter({ ...rest })
    } else {
      setFilter({ ...filter, [name]: value })
    }
  }

  const taskFormToggle = async (task) => {
    setIsError(false);
    if (task) {
      let completed = 0;
      if (task.completed) {
        completed = [task.completed.toString()];
      }
      task = { ...task, ['completed']: completed, destination_date: new Date(new Date(task.destination_date).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 16) };
    }
    setSelectedTask(task);
    toggleModal();
  }

  const submitForm = async (task) => {
    setIsLoading(true);
    setIsError(false);
    try {
      let data;
      if (selectedTask) {
        data = await updateTask(task, filter, orderBy, order, page, tpp);
      } else {
        data = await addTask(task, filter, orderBy, order, page, tpp);
      };
      toggleModal();
      setTasksData(data);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }

  const onDeleteTask = async ({ id }) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await deleteTask(id, filter, orderBy, order, page, tpp);
      setTasksData(data);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="home mt-5">
      <Modal isShowing={isShowing} hideModal={toggleModal} selectedTask={selectedTask} submitForm={submitForm} isLoading={isLoading} isError={isError} />
      <Statistics totalTasks={totalTasks} tasksCompleted={tasksCompleted} />
      <div className="App container">
        <Filters filter={filter} handleFilterChange={handleFilterChange} />
        <TasksTable tasks={tasks} taskFormToggle={taskFormToggle} onDeleteTask={onDeleteTask} handleSortChange={handleSortChange} order={order} orderBy={orderBy}></TasksTable>
        <Paginator links={links} page={page} setPage={setPage} totalPages={totalPages} />
        {isError && <div className="d-flex my-3 justify-content-center">
            <div className="text-danger">{isError}</div>
          </div>}
          {isLoading && <div className="d-flex my-3 justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>}
      </div>
    </div>
  );
}

export default Home;
