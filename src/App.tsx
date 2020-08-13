import React, { useState } from 'react';
import {Formik, Form, Field} from 'formik';
import './App.css';

function App() {
  const [notes, setNotes] = useState(new Array<NoteProps>());

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notepad</h1>
        <NewNote notes={notes} setNotes={setNotes}/>
        <div className='notes-list'>
          {notes.map(note => (<Note name={note.name} email={note.email} comment={note.comment}/>))}
        </div>
      </header>
    </div>
  );
}

type NoteProps = {
  name: String,
  email: String,
  comment: String,
}
const emptyNote = {
  name: '',
  email: '',
  comment: ''
}


type NewNoteProps = {
  notes: Array<NoteProps>,
  setNotes: Function
}
function NewNote({notes, setNotes}: NewNoteProps) {
  const addNote = (values:NoteProps, { resetForm}:any) => {
    let newNotes = [...notes];
    newNotes.unshift(values);
    setNotes(newNotes);
    resetForm();
  };
  return(
    <Formik initialValues={emptyNote} onSubmit={addNote}>
      <Form className='new-note'>
        <Field type='text' name='name' placeholder='Name' />
        <Field type='email' name="email" placeholder='Email' />
        <Field component='textarea' name='comment' placeholder='Comment' />
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

function Note({name, email, comment}: NoteProps) {
  return(
    <div>
      <h2>{name} ({email})</h2>
      <div>{comment}</div>
    </div>
  );
}

export default App;
