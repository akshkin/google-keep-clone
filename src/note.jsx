import React, { useState, useEffect } from 'react'

export default function Note({note, activeNote, editNoteColor, selectNote, deleteNote}) {
  const {id, title, body, color, lastModified} = note
  const [showTooltip, setShowTooltip] = useState(false)
  const [noteColor, setNoteColor] = useState("white")
  const [editedNote, setEditedNote] = useState({
    ...note,
    color: "white"
  })

  const handleShow = () => {
    setShowTooltip(true)
  }
  const closeTooltip = () => {
    setShowTooltip(false)
  }
  //const editedNote = {...note, color: noteColor}
  
  useEffect(() => {
    const setColor = () => {
      setEditedNote({...editedNote, color: noteColor})
      if(noteColor !== "white") {
        console.log(noteColor)
        console.log(editedNote)
        editNoteColor(editedNote)
      }
    }
    setColor()
    
  },[noteColor])

  
  const style ={
    backgroundColor: noteColor ? noteColor : color
  }
  
  return (
    <div className='note' style={style}  onMouseOver={handleShow}
    onMouseLeave={closeTooltip}>
      <h4 className='note-title'>{title}</h4>
      <div className='note-body'>{body && body.substr(0, 80) + "..."}</div>
      <small className='small'>{lastModified}</small>
      <div className='note-buttons'>
        <button className='note-button' onClick={()=>deleteNote(id)}>delete</button>
        <button className='note-button' onClick={()=>selectNote(id)}>edit</button> 
      </div>
      {showTooltip && <div  className='toolbar-color'>
        <div className="color-tooltip">
          <div className="color-option white" color='#fff'  onClick={() => setNoteColor('#fff')}></div>
          <div className="color-option purple" color='#d7aefb' onClick={() => setNoteColor('#d7aefb')}></div>
          <div className="color-option orange" color='#fbbc04' onClick={() => setNoteColor('#fbbc04')}></div>
          <div className="color-option teal" color='#a7ffeb' onClick={() => setNoteColor('#a7ffeb')}></div>
        </div>
      </div>}
    </div>
  )
}
