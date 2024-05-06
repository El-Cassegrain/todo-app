import { useState } from "react"

export default function ListItem({itemData, deleteTodo, toggleTask, showRemaining, showDone}) {
  
  const handleClick = () => {
    if (toggleTask){
      toggleTask(itemData.id)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  if ((showRemaining && itemData.done) || (showDone && !itemData.done)) {
    return null; // Ne rend rien si l'élément ne correspond pas au filtre
  }

  return (
      <li className={`task-wrapper pr-3 flex relative ${itemData.done && 'task-done'}`}>

          <span tabIndex={0} onKeyDown={handleKeyPress} onClick={handleClick} className={`relative w-full py-4 mr-11 pl-11 task-text ${itemData.done && 'line-through italic text-gray-500'}`}>{itemData.content.toString()}
          
          <span className="svg-wrapper absolute top-4 left-3" onClick=    {handleClick}>
            <svg className="icon-to-click" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              {itemData.done ? (
                <>
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "hsl(192, 100%, 67%)" }} />
                      <stop offset="100%" style={{ stopColor: "hsl(280, 87%, 65%)" }} />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="10" fill="url(#grad)" />
                  <path fill="none" stroke="#FFF" strokeWidth="2" d="M8.5 12.5l2 2 5-5"/>
                </>
              ) : (
                <circle cx="12" cy="12" r="10" stroke="#4d5066" fill="transparent" />
              )}
            </svg>
            </span>
          </span>
          
          <button onClick={() => deleteTodo(itemData.id)} className="btn-close absolute right-4 top-4 z-20 ml-auto w-6 h-6 rounded">
            <svg className="cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
            </svg>
          </button>
      </li>
  )
}