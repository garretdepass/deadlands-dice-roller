import React, { useState, useEffect } from 'react';

function App() {
  // const [tasks, setTasks] = useState([]);
  const [characters, setCharacters] = useState([]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/.netlify/functions/get_task');
  //     const data = await response.json();
  //     setTasks(data);
  //   };
  //   fetchData();
  // }, []);









  // This is the useEffect function I intend to use!

  // useEffect( () => {
  //   const fetchData = async () => {
  //     const response = await fetch('/.netlify/functions/get_characters');
  //     const data = await response.json();
  //     setCharacters(data);
  //   }
  //   fetchData();
  // }, []);






  // const [searchTerm, setSearchTerm] = useState('');

  //
  // const searchTasks = async () => {
  //   // Call the Netlify function
  //   const response = await fetch(`/.netlify/functions/get_task?id=${searchTerm}`);
  //   const data = await response.json();
  //   setTasks(data);
  // };

  // const updateTask = async (_id, status) => {
  //   // Call the Netlify function
  //   const response = await fetch('/.netlify/functions/update_task', {
  //     method: 'POST',
  //     body: JSON.stringify({ _id, status })
  //   });
  //   const data = await response.json();
  //   console.log('data', data);
  //   const newTasks = tasks.map(
  //     task => (task._id === data._id ? { ...task, ...data } : task)
  //   );
  //   console.log('newTasks', newTasks);
  //   setTasks(newTasks);
  // }

  // const deleteTask = async (_id) => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this task?');

  //   if (!confirmDelete) {
  //     return;
  //   }
  //   // Call the Netlify function
  //   const response = await fetch(`/.netlify/functions/delete_task?id=${_id}`);
  //   const data = await response.json();
  //   const newTasks = tasks.filter(task => task._id !== _id);
  //   setTasks(newTasks);
  // }

  // const addTask = async () => {
  //   // Call the Netlify function
  //   const taskTitle = prompt('Task title:');
  //   const taskStatus = 'New'
  //   const taskDate = new Date().toISOString().slice(0, 10);
  //   const response = await fetch('/.netlify/functions/add_task', {
  //     method: 'POST',
  //     body: JSON.stringify({ 
  //       title: taskTitle, 
  //       status: taskStatus,
  //       date: taskDate
  //      })
  //   });
  //   const data = await response.json();
  //   setTasks([...tasks, data]);
  // }

  return (
    <div className="App">
      <h1>Hello, world!</h1>
      {/* <h1>Task Manager</h1>
      <div class="search-bar"><input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search for a task name" 
      />
      <button onClick={searchTasks}>Search</button></div>
      


    { (characters.length === 0) && <div>No Characters...</div>  || <div class="restaurant-grid">
        {characters.map(character => (
          <div key={character._id} class="restaurant-tile">
            <div class="restaurant-delete-button">
              <button  onClick={async () => { await deleteTask(task._id) }} >X</button>
            </div>
            <h2>{character.name}</h2>
            <p>Status : {task.status} </p>
            <p>Date : {task.date} </p>

            <button onClick={async () => {await updateTask(task._id, 'Done')}}>Done</button>
          </div>

        ))}
      </div>}
      <button onClick={addTask} >Add Task</button> */}
    </div> 
  );
}

export default App;
