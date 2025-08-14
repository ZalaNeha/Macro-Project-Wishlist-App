import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import {v4 as uuid} from 'uuid';
function App() {
  const [todo,setTodo]=useState();
  const [todolist,setTodolist]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const onTodochange=(e)=>{
    setTodo(e.target.value);
  }
  const onAddtodoclick=()=>{
    // setTodolist([...todolist,{id: uuid(),todo: todo,isCompleted: false}]);
    // setFilteredList(updatedList);
    // setTodo('');
    if (todo.trim() === '') return;
    const updatedList = [...todolist, { id: uuid(), todo: todo, isCompleted: false }];
    setTodolist(updatedList);
    setFilteredList(updatedList);
    setTodo('');
  }
  const onDeleteclick=(id)=>{
    const updatetodolist=todolist.filter(todo=>todo.id!==id);
    setTodolist(updatetodolist);
    setFilteredList(updatetodolist);
  }
  const ontodoclick=(id)=>{
    const updatetodolist=todolist.map((todo)=> todo.id===id ? {...todo,isCompleted: !todo.isCompleted}:todo)
    setTodolist(updatetodolist)
    setFilteredList(updatetodolist);
  } 
  const onSearchChange = (e) => setSearchTerm(e.target.value);

  const onSearchClick = () => {
    if (searchTerm.trim() === '') {
      setFilteredList(todolist);
    } else {
      const results = todolist.filter((item) =>
        item.todo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(results);
    }
  };
  return (
    
      
      <div className='App'>
        <h1>My Wishlist</h1>
        <div className="input-group">
          <input value={todo} onChange={onTodochange} placeholder='Add Your wishlist Here..'/>
          <button className="add-btn" onClick={onAddtodoclick}>Add</button>
        </div>
        
        {/* Search Bar */}
  <div className="search-group">
    <input
      type="text"
      className="search-input"
      value={searchTerm}
      onChange={onSearchChange}
      placeholder="Search in Wishlist..."
    />
    <button className="search-btn" onClick={onSearchClick}>Search</button>
  </div>

        <div>
         
          {/* // todolist && todolist.length>0 && todolist.map(todo=>( */}
            {filteredList && filteredList.length > 0 ? (
            filteredList.map((item) => (
            <div className='wishlist-item' key={item.id}>
              <label>
                <input onChange={()=>ontodoclick(item.id)} type='checkbox' checked={item.isCompleted}/>
                <span className={item.isCompleted ? 'strike-through' : ''}>
            {item.todo}
          </span>
                
              </label>
              <button className="delete-btn" onClick={() => onDeleteclick(item.id)}>🗑</button>
             
            </div>
          ))
        ) : (
          <p>whishlist not found</p>
        )}
         
        </div>
      </div>
      
  );
}

export default App;
