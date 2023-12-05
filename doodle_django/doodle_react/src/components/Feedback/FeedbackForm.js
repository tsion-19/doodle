import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FeedbackModal from "./FeedbackModal";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Background = styled.div`
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(to bottom right, #ffcc00, #ff6699, #9966ff, #00ccff);
// `;

// const StyledForm = styled(Form)`
//   background-color: #ffffff;
//   padding: 40px;
//   border-radius: 10px;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
//   max-width: 1000px;
//   width: 100%;
// `;

// const CenteredContainer = styled.div`
//   display: grid;
//   place-items: center;
//   height: 100%;
// `;

const FeedbackForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles((selectedFiles) => [...selectedFiles, e.target.files[0]]);
  };

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setmodalMessage] = useState("Message");
  const [redirect, setRedirect] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (redirect) {
      navigate("/");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("message", message);

    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    axios
      .post("http://127.0.0.1:8000/api/feedback/new/", data, {
        headers: {
          "Content-type": "multipart/form-data",
          withCredentials: true,
        },
      })
      .then((response) => {
        setmodalMessage("SUCCESS");
        setRedirect(true);
        handleOpenModal();
      })
      .catch((error) => {
        setmodalMessage("FAIL");
        handleOpenModal();
      });
  };

  const files = selectedFiles ? [...selectedFiles] : [];

  return (
    <div id="background_div">
      <FeedbackModal
        show={showModal}
        message={modalMessage}
        onHide={handleCloseModal}
      />
      <Container>
        <div id="CenteredContainer">
          <div id="StyledForm" onSubmit={handleFormSubmit}>
            <h2 className="text-center mb-4">Submit Feedback</h2>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter your name"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="message">Message</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={3}
                placeholder="Enter message"
                onChange={(event) => setMessage(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="files">Upload files</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
              <ul className="mt-2">
                {files.map((file, i) => (
                  <li key={i}>
                    {file.name} ({(file.size / 1000).toFixed(2)} KBs)
                  </li>
                ))}
              </ul>
            </Form.Group>
            <div className="d-grid">
              <Button variant="success" size="lg" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FeedbackForm;
