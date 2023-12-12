import { Button, Modal } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

const FeedbackModal = ({ show, onHide, message }) => {
  return (
    <div>
      {/* <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      /> */}

      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
