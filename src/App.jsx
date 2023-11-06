import React, { useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [submittedForms, setSubmittedForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value);
  };

  const addQuestion = () => {
    if (currentQuestion.trim() !== '') {
      setQuestions([...questions, { text: currentQuestion }]);
      setCurrentQuestion('');
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleInput3Change = (e) => {
    setInput3(e.target.value);
  };

  const submitData = () => {
    // Save data to local storage
    const formData = {
      question1,
      question2,
      question3,
    };


    localStorage.setItem(`form${submittedForms.length + 1}`, JSON.stringify(formData));

    // Clear input fields after submitting
    setInput1('');
    setInput2('');
    setInput3('');
    setSubmittedForms([...submittedForms, formData]);
    closeDialog();
  };

  const viewFormResponses = (formIndex) => {
    setSelectedForm(submittedForms[formIndex]);
  };

  return (
    <div style={{ backgroundColor: 'GrayText' }}>
      <h1 className='container'>Form Builder</h1>
      <button onClick={openDialog}>Add Question</button>

      {isDialogOpen && (
        <div className="modal" style={{ backgroundColor: 'grey' }}>
          <h2>Enter Data</h2>
          <div>
            <input
              type="text"
              placeholder="Input 1"
              value={input1}
              onChange={handleInput1Change}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Input 2"
              value={input2}
              onChange={handleInput2Change}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Input 3"
              value={input3}
              onChange={handleInput3Change}
            />
          </div>
          <button onClick={submitData}>Submit</button>
          <button onClick={closeDialog}>Close</button>
        </div>
      )}

      <div>
        <h2>Submitted Forms</h2>
        {submittedForms.map((form, index) => (
          <div key={index}>
            <a
              href="#"
              onClick={() => viewFormResponses(index)}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Form {index + 1}
            </a>
          </div>
        ))}
      </div>

      {selectedForm && (
        <div className="modal" style={{ backgroundColor: 'grey' }}>
          <h2>Form Responses</h2>
          <p>Input 1: {selectedForm.input1}</p>
          <p>Input 2: {selectedForm.input2}</p>
          <p>Input 3: {selectedForm.input3}</p>
          <button onClick={() => setSelectedForm(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;