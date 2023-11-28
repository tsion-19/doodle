import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FeedbackForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    // Access the uploaded files from the input field
    setSelectedFiles(selectedFiles => [...selectedFiles, e.target.files[0]]);
  };

  const csrftoken = () => Cookies.get('csrftoken');
  const getToken = () => sessionStorage.getItem("token");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process the selected files here (e.g., send them to the server)
    // For demonstration purposes, you can log the file details
    console.log('Selected Files:', selectedFiles);
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('message', message);

    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });


    axios.post(
      "http://127.0.0.1:8000/api/feedback/new/",
      data,
      {
        headers: {
          'authorization': `Token ${getToken()}`,
          'Content-type': 'multipart/form-data',
          'withCredentials': true,
          'X-CSRFTOKEN': csrftoken(),
        },
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  const files = selectedFiles ? [...selectedFiles] : [];

  return (
    <div>
      <h2>File Upload Form</h2>
      <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(event) =>
              setName(event.target.value)
            }
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            name="message"
            id="message"
            onChange={(event) =>
              setMessage(event.target.value)
            }
          />
          <label htmlFor="fileInput">Select Files:</label>
          <input
            name="files"
            type="file"
            id="files"
            multiple
            onChange={handleFileChange}
          />
          <ul>
            {files.map((file, i) => (
              <li key={i}>
                {file.name} - {file.type}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;