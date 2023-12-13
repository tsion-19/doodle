import feedback from "../images/feedback1.png";
import "./feedbackImage.css";

const FeedbackImage = ({ feedbackImageClick }) => {
  return (
    <div className="feedback_image" onClick={feedbackImageClick}>
      <img src={feedback} alt="Feedback" />
    </div>
  );
};

export default FeedbackImage;
