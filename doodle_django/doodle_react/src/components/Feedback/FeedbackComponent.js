import FeedbackFormPage from "./FeedbackFormPage";
import FeedbackImage from "./FeedbackImage";
import { useState } from "react";

const FeedbackComponent = () => {
  const [formVisibility, setFormVisibility] = useState(false);

  const feedbackImageClick = () => {
    formVisibility ? setFormVisibility(false) : setFormVisibility(true);
  };

  return (
    <div>
      {formVisibility ? (
        <FeedbackFormPage setFormVisibility={setFormVisibility} />
      ) : (
        <div></div>
      )}
      <FeedbackImage feedbackImageClick={feedbackImageClick} />
    </div>
  );
};

export default FeedbackComponent;
