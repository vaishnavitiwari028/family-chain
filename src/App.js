import React, { useState, useEffect } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import FamilyTree from './components/FamilyTree';
import FamilyList from './components/FamilyList';

function App() {
  const [familyMembers, setFamilyMembers] = useState([]);

  // Load family members from local storage on initial render
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem('familyMembers'));
    if (storedMembers) {
      setFamilyMembers(storedMembers);
    }
  }, []);

  // Save family members to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
  }, [familyMembers]);

  const handleAddMember = (member) => {
    setFamilyMembers([...familyMembers, member]);
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  return (
    <div className="app">
      <h1>Family Tree Visualization</h1>
      <InputForm onAddMember={handleAddMember} />
      <FamilyTree data={familyMembers} />
      <FamilyList members={familyMembers} onDeleteMember={handleDeleteMember} />
    </div>
  );
}

export default App;
