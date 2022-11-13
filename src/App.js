import { useState, useEffect } from "react"
import Note from "./note";
import './App.css';
import Modal from "./modal";
import Header from "./header";



function App() {
  const [note, setNote] = useState({
    title: '',
    body: ''
  })
  const {title, body} = note
  const [formOpen, setFormOpen] = useState(false)
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("myNotes")) || [])
  const [modal, setModal] = useState(false)
  const [activeNote, setActiveNote] = useState(false)
  
  useEffect(() => {
   JSON.parse(localStorage.getItem("myNotes"))
  }, [notes])

  
  const saveNotesToLocalStorage = notes => {
    localStorage.setItem("myNotes", JSON.stringify(notes))
  }
  
  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      title: note.title,
      body: note.body,
      lastModified: new Date().toLocaleString(),
      color: "white"
    }
    
    const newNotes = [...notes, newNote]
    saveNotesToLocalStorage(newNotes)
    setNotes(newNotes)
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id)
    saveNotesToLocalStorage(newNotes)
    setNotes(newNotes)
  }

  const getActiveNote = () => {
    return notes.find(note => note.id === activeNote)
  }

  const selectNote = (id) =>{
    setActiveNote(id)
    console.log(activeNote)
    setModal(true)    
  }


  const updateNote = (updatedNote, id) =>{
    setActiveNote(id)
    const updatedNotes = notes.map(note => {
      if(note.id === activeNote){        
        return updatedNote 
      }
      return note
    })      
      setNotes(updatedNotes)
      saveNotesToLocalStorage(updatedNotes)  
      setModal(false) 
    }

    const editNoteColor = (color, id) => {
      setActiveNote(id)
      const editedNotes = notes.map(note => {
        if(note.id === activeNote){
          return {...note, color}
        }
        return note
      })
      setNotes(editedNotes)
      saveNotesToLocalStorage(editedNotes)
    }
    console.log(notes)
    
  const handleChange = event => {
    const {name, value} = event.target
    setNote({...note, [name]: value})
  }
  const handleSubmit = event => {
    event.preventDefault()
    const hasNote = title || body
    if(hasNote){
      addNote({title, body})
    }
    setNote({
      title: '',
      body: ''
    })
    setFormOpen(false)
  }
  

  return (
    <div className="App">
      {
          modal && 
            <Modal 
              activeNote={getActiveNote()}
              setModal={setModal}
              updateNote={updateNote}
              setActiveNote={setActiveNote}
            />
        } 
      <Header />  
      <form className="form-container" onSubmit={handleSubmit}>
        {formOpen && <input 
          className="form-title"
          type="text" 
          name="title" 
          value={title}
          placeholder="Title"
          onChange={handleChange}          
        />}
        <input 
          className="form-body"
          name="body" 
          value={body}
          placeholder="Take a note" 
          onChange={handleChange}
          onClick={() => setFormOpen(!formOpen)}
        />
        {formOpen && <div className="form-buttons">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="close-button" onClick={() => setFormOpen(false)}>Close</button>
        </div>}
      </form> 
      <div className="notes">
        {notes && notes.map(note => 
          <Note 
            key={note.id} 
            note={note}
            selectNote={selectNote}
            deleteNote={deleteNote} 
            editNoteColor={editNoteColor}
            setActiveNote={setActiveNote}
          />
        )}
      </div>   
       
    </div>
  );
}

export default App;
