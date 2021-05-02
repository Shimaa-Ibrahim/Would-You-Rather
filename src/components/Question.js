import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Question = (props) => {
  const { question } = props;
  const author = question.authorDetails;

  return (
    <div className="question-div">
      <div className="question-author">{author.name}</div>
      <div className="question-flex">
        <div className="question-avatar-div">
          <img
            src={author.avatarURL}
            alt={author.name + " avatar"}
            className="question-avatar"
          />
        </div>
        <div className="separator"></div>
        <div className="question-content">
          <h4>Would You Rather</h4>
          <p>
            <small>{question.optionOne.text.slice(0, 10)}...</small>
          </p>
          <Link
            to={"/questions/" + question.id}
            style={{ textDecoration: "none" }}
          >
            <div className="question-btn">
              <small>View Poll</small>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ questions, users }, { id }) {
  const question = {
    ...questions[id],
    authorDetails: users[questions[id].author]
  };
  return {
    question
  };
}

export default connect(mapStateToProps)(Question);