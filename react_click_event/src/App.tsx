import React, { useState } from 'react'
import './App.css'

//interface to set the data type of the points
interface ClickedProps {
  clientX: number
  clientY: number
}


function App() {
  //creates an array that holds the points on states
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  //creates an array that holds the undo points on states
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([])

  //funtion to get the coordinates on mouse click
  function gerCoordinates(e: React.MouseEvent<HTMLElement>) {
    //gets the clientX and clientY from the event (mouse click)
    const { clientX, clientY } = e
    //set the clientX and clientY to clickedPoints array
    setClickedPoints([...clickedPoints, { clientX, clientY }])
  }

  //function to handle the undo button
  function handleUndo() {
    const newClickedPoits = [...clickedPoints]
    const undoPoint = newClickedPoits.pop()
    setClickedPoints(newClickedPoits)
    if (!undoPoint) return
    setUndoPoints([...undoPoints, undoPoint])
  }

  //function to handle the redo button
  function handleRedo() {
    const newUndoPoints = [...undoPoints]
    const redoPoint = newUndoPoints.pop()    
    if(!redoPoint) return
    setUndoPoints(newUndoPoints)
    setClickedPoints([...clickedPoints, redoPoint])
  }

  return (
    <>
      <button disabled={clickedPoints.length === 0} onClick={handleUndo}>undo</button>
      <button disabled={undoPoints.length === 0} onClick={handleRedo}>redo</button>

      <div className="App" onClick={gerCoordinates}>
        {clickedPoints.map((clickedPoint, index) => {
          return (
            <div
              key={index}
              style={{
                left: clickedPoint.clientX - 7,
                top: clickedPoint.clientY - 7,
                position: 'absolute',
                borderRadius: '50%',
                background: 'red',
                width: '20px',
                height: '20px'
              }}
            >

            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
