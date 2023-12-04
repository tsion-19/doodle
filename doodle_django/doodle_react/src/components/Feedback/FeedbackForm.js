import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Background = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #ffcc00, #ff6699, #9966ff, #00ccff);
`;

const StyledForm = styled(Form)`
  background-color: #ffffff; /* Form background color */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Box shadow effect */
  max-width: 1300px;
  width: 100%;
`;

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
    <Background>
      <Container>
        <StyledForm encType="multipart/form-data" onSubmit={handleFormSubmit}>
          <h2 className="text-center mb-4">Submit Feedback</h2>
          <Form.Group className="mt-4">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control type="text"
                placeholder="Enter your name"
                onChange={(event) =>setName(event.target.value)}/>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label htmlFor="email">Email address</Form.Label>
            <Form.Control type="email"
                placeholder="Enter email"
                onChange={(event) =>setEmail(event.target.value)}/>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label htmlFor="message">Message</Form.Label>
            <Form.Control type="text"
                as="textarea"
                rows={3}
                placeholder="Enter message"
                onChange={(event) =>setMessage(event.target.value)}/>
            <Form.Text className="text-muted" rows={3}></Form.Text>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label htmlFor="files">Upload files</Form.Label>
            <Form.Control type="file"
                multiple
                onChange={handleFileChange}/>
                <ul className="mt-4">
                {files.map((file, i) => (<li className="pt-2" key={i}>{file.name} ({file.size / 1000} KBs)</li>))}
                </ul>
          </Form.Group>
          <Button className="mt-4 btn-lg" variant="success" type="submit">Submit</Button>
        </StyledForm>
      </Container>
    </Background>
  );
};

export default FeedbackForm;
