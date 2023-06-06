import { useState } from 'react'
import './App.css'
import { initialTasks } from './data/initial-data'

import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {

  const [tasks, setTasks] = useState(initialTasks)

  const handleReorder = (list=[], startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    
    return result
  }

  return (
    <DragDropContext onDragEnd={(result)=>{

      const { source, destination } = result
      if(!destination ) return;
      if( source.index === destination.index && 
          source.droppableId === destination.droppableId
        ) return;

      setTasks(prevTasks => handleReorder(prevTasks, source.index, destination.index) )
    }}>
      <div className='app'>
        <h1>Estudiar</h1>
        {/* Zona del Dropable */}
        <Droppable droppableId='tasks' direction='vertical'>
          {(droppableProvided) => (
            <ul 
              {...droppableProvided.droppableProps} 
              ref={droppableProvided.innerRef}
              className='task-container'
              >
            {/* Zona del Draggable */}
            {
              tasks.map( (task, index) => {


                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                  {
                    (draggableProvided)=>(
                      <li 
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps} 
                        {...draggableProvided.dragHandleProps}
                        className="task-item">{task.text}</li>
                    )
                  }
                </Draggable>
                )


              } )
            }
            {
              //reserva un espacio reservado para que no se nos escape el elemento
              droppableProvided.placeholder
            }
            </ul>
          )}
        </Droppable>


      </div>
    </DragDropContext>
       
  )
}

export default App
