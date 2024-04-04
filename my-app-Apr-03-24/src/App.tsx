import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
    interface UserFormState {
    email: string;
    password: string;
    username: string;
  }
  const [userForm, setUserForm] = useState<UserFormState>({
    email: '',
    password: '',
    username: 'MIU'
  });
  const handleChangeName = () => {

    setUserForm({email: 'this', password: '291', username : 'MSD'});
  }
  return (
    <div>
      {userForm.username}
      <button onClick={handleChangeName}>Change Name</button>
    </div>
  );
  
}

export default App;
