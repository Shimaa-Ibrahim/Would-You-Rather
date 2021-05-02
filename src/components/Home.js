import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Question from "./Question";

const Home = (props) => {
  const [answered, setAnswered] = useState(false);
  const handleClick = bool => {
    setAnswered(bool);
  };

  return props.authedUser ? (
    <div className="card">
      <div className="home-buttons">
        <div
          onClick={() => handleClick(false)}
          className={!answered ? "active-questions-btn" : ""}
        >
          <p>Unanswered quesions</p>
        </div>
        <div
          onClick={() => handleClick(true)}
          className={answered ? "active-questions-btn" : ""}
        >
          <p>Answered quesions</p>
        </div>
      </div>
      <div className="home-questions">
        {answered
          ? props.answered.map(id => <Question key={id} id={id} />)
          : props.unanswered.map(id => <Question key={id} id={id} />)}
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

function mapStateToProps({ users, questions, authedUser }) {
  const user = users[authedUser];
  const answersArr = user
    ? Object.keys(user.answers).sort(
        (a, b) => user.answers[b].timestamp - user.answers[a].timestamp
      )
    : [];
  const questionsID = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unanswered = questionsID.filter(q => !answersArr.includes(q));
  const answered = questionsID.filter(q => answersArr.includes(q));
  return {
    authedUser,
    user,
    answered,
    unanswered
  };
}

export default connect(mapStateToProps)(Home);