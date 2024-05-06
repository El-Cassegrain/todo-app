import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import ListItem from "./ListItem"

export default function Checklist({theme}) {
    
    const [showRemaining, setShowRemaining] = useState(false);
    const [showDone, setShowDone] = useState(false);

    const [todoList, setTodoList] = useState([
        {id: nanoid(), content: "Faire le ménage à fond dans l'appart", done: false},
        {id: nanoid(), content: "Vider les poubelles", done: false},
        {id: nanoid(), content: "Déclarer à l'URSSAF", done: false}
    ])

    const filteredTodoList = showRemaining ? todoList.filter(task => !task.done) : todoList;

    const filteredDoneTodoList = showDone ? todoList.filter(task => task.done) : todoList;


    useEffect(() => {
        // Barrer le premier élément de la liste par défaut
        if (filteredTodoList.length > 0) {
          const updatedList = [...todoList];
          updatedList[0].done = true;
          setTodoList(updatedList);
        }
      }, []);

    const remainingTasks = todoList.filter(task => !task.done).length;

      const [showValidation, setShowValidation] = useState(false)
    
      const [todo, setTodo] = useState("")
    
      function deleteTodo(id){
        setTodoList(todoList.filter(todo => todo.id !== id))
      }
    
      function handleSubmit(e){
        e.preventDefault()
    
        if(todo === ""){
          setShowValidation(true)
          return
        }
        
        setTodoList([...todoList, {id: nanoid(), content: todo, done: false}])
        setTodo("")
        setShowValidation(false)
      }

      const toggleTask = (taskId) => {
        const updatedTodoList = todoList.map(task => {
          if (task.id === taskId) {
            return { ...task, done: !task.done };
          }
          return task;
        });
        setTodoList(updatedTodoList);
    }

    const handleFilter = (filterType) => {
        switch (filterType) {
          case 'all':
            setShowRemaining(false);
            setShowDone(false)
            break;
          case 'completed':
            setShowRemaining(false);
            setShowDone(true);
            break;
          case 'active':
            setShowRemaining(true);
            setShowDone(false);
            break;
          default:
            setShowRemaining(true);
            setShowDone(true);
            break;
        }
      };
    
      const clearCompleted = () => {
        const remainingTasks = todoList.filter(task => !task.done);
        setTodoList(remainingTasks);
      };



  return (
    <div className={`form-container mb-5 ${theme ? "light-mode" : "dark-mode"}`}>
        
        {todoList.length === 0 && (
            <p className="mb-2">Well, you don't have anything to do...</p>
        )}
        
        <form action="" onSubmit={handleSubmit} className="shadow-lg">
            <div className="input-wrapper relative h-10">
                <div className="svg-wrapper absolute top-3 left-3">
                    <svg>
                        <circle stroke="#4d5066" fill="transparent" cx="12" cy="12" r="10"></circle>
                    </svg>
                </div>
            
                <input 
                type="text" 
                className="rounded border-none w-full h-10 py-6 pl-11" 
                placeholder="Create a new todo"
                value={todo} 
                onChange={e => setTodo(e.target.value)}
                />
            {showValidation && (
                <p className="text-red-400 my-2">Please first add a task</p>
            )}
            </div>
          </form>

            <div className="list-container shadow-2xl">                
                <ul className="mt-10 divide-y rounded">

                    {filteredTodoList.map(task => (
                        <ListItem 
                        key={task.id} 
                        itemData={task} 
                        deleteTodo={deleteTodo} 
                        toggleTask={toggleTask} 
                        todo={todo}
                        showRemaining={showRemaining}
                        showDone={showDone}
                        />
                    ))}
                </ul>
            </div>

            <div className={`border-t py-4 px-4 tabs-wrapper flex justify-between ${theme ? 'light-mode' : 'dark-mode'}`}>
                <div className="task-left-wrapper">
                    <span id="item-left-count">{remainingTasks} item{remainingTasks > 1 ? 's' : ''} left</span>
                </div>
                <div className="tabs-nav-wrapper hidden md:flex">
                    <button className={`px-1 mx-1 ${!showRemaining && !showDone ? 'active' : ''}`} onClick={() => handleFilter('all')}>All</button>
                    <button className={`px-1 mx-1 ${showRemaining && !showDone ? 'active' : ''}`} onClick={() => handleFilter('active')}>Active</button>
                    <button className={`px-1 mx-1 ${!showRemaining && showDone ? 'active' : ''}`} onClick={() => handleFilter('completed')}>Completed</button>
                </div>
                <div className="clear-btn-wrapper">
                    <button onClick={clearCompleted}>Clear Completed</button>
                </div>
            </div>

            <div className={`tabs-nav-wrapper-mobile py-3 rounded mt-8 md:hidden ${theme ? 'light-mode' : 'dark-mode'}`}>
                    <div className="max-w-80 mx-auto flex justify-around">

                    
                    <button className={`px-1 mx-1 ${!showRemaining && !showDone ? 'active' : ''}`} onClick={() => handleFilter('all')}>All</button>
                    <button className={`px-1 mx-1 ${showRemaining && !showDone ? 'active' : ''}`} onClick={() => handleFilter('active')}>Active</button>
                    <button className={`px-1 mx-1 ${!showRemaining && showDone ? 'active' : ''}`} onClick={() => handleFilter('completed')}>Completed</button>
                    </div>
                </div>

                <div className="info-reorder mt-20 flex justify-center">
                    <p>Drag and drop to reorder list</p>
                </div>

    </div>
  )
}