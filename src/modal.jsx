import React, { useState } from 'react'

export default function Modal({activeNote, setModal, updateNote}) {

  const [modalForm, setModalForm] = useState({
    ...activeNote,
    id: activeNote.id,
    title: activeNote.title,
    body: activeNote.body,
    lastModified: activeNote.lastModified
  })
  const {title, body} = modalForm

  const handleChange = event => {
    const {name, value} = event.target
    setModalForm(prevForm => ({...prevForm, [name] : value, lastModified: new Date().toLocaleString()}))    
  }
 

  const handleSubmit = event => {
    event.preventDefault()
    updateNote(modalForm)    
  }

  if(!activeNote) return <></>
  return (
    <div className="modal">
      <form className="modal-content">
        <label htmlFor="modalTitle">Title</label>
        <input 
          id="modalTitle"
          type="text" 
          placeholder=''
          name="title"
          value={title}
          onChange={handleChange}
          className="modal-title"

        />
        <label htmlFor='modalBody'>Body</label>
        <textarea 
          id="modalBody" 
          name="body"
          value={body}
          onChange={handleChange}
          className="modal-body"          
        />
        <div className='modal-buttons'>
          <button className='save-button' onClick={handleSubmit}>
            Save
          </button>
          <button className='close-button' type="button" onClick={() => setModal(false)}>
            Close
          </button>
        </div>
      </form>
</div>
  )
}
