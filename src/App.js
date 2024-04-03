import './App.css';
import TasksTable from './components/TasksTable';

const App = () => {
  return (
    <div className="App">
      <div className='container'>
        <TasksTable />
      </div>
    </div>
  );
}

export default App;
