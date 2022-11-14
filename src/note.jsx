import React, { useState, useEffect } from 'react'
import { ReactComponent as EditIcon } from './assets/edit-2-fill.svg'
import { ReactComponent as DeleteIcon } from "./assets/delete-icon.svg"
import { ReactComponent as PaletteIcon } from "./assets/palette-icon.svg"

export default function Note({note, setActiveNote, editNoteColor, selectNote, deleteNote}) {
  const {id, title, body, color, lastModified} = note
  const [showTooltip, setShowTooltip] = useState(false)
  const [noteColor, setNoteColor] = useState("white")
  

  const handleShow = () => {  
    setActiveNote(note.id)  
    setShowTooltip(true)
  }
  const closeTooltip = () => {
    setShowTooltip(false)
  }
  
  useEffect(() => {    
    editNoteColor(noteColor)    
  },[noteColor])

  
  const style ={
    backgroundColor: noteColor !== "white" ? noteColor : color
  }
  
  return (
    <div className='note' style={style}  
    >
      <h4 className='note-title'>{title}</h4>
      <div className='note-body'>{body && body.substr(0, 80) + "..."}</div>
      <small className='small'>{lastModified}</small>
      <div className='note-buttons'>
        <button className='note-button' onClick={()=>deleteNote(id)}><DeleteIcon /></button>
        <button className='note-button' onClick={()=>selectNote(id)}><EditIcon /></button> 
        <button 
          onMouseOver={handleShow}
          onMouseLeave={closeTooltip}
          className='note-button'
        >
         <PaletteIcon />
        </button>
      </div>
      {
        showTooltip && 
          <div className="color-tooltip" onMouseOver={handleShow} onMouseLeave={closeTooltip}>
            <div className="color-option white" color='#fff'  onClick={() => setNoteColor('#fff')}></div>
            <div className="color-option purple" color='#d7aefb' onClick={() => setNoteColor('#d7aefb')}></div>
            <div className="color-option orange" color='#fbd0d0' onClick={() => setNoteColor('#fbd0d0')}></div>
            <div className="color-option teal" color='#d8f1f3' onClick={() => setNoteColor('#B2E2E6')}></div>
          </div>
      }
     
    </div>
  )
}
