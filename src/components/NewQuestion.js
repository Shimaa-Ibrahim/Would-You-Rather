import { connect } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";

import { handleAddQuestion } from "../actions/shared";

const NewQuestion = (props) => {
  const [optOne, setOptOne] = useState("");
  const [optTwo, setOptTwo] = useState("");
  const [valid, setValid] = useState(true);
  const [toHome, setToHome] = useState(false);

  const handleChange = (e, option) => {
    if (option === "one") {
      setOptOne(e.target.value);
    } else if (option === "two") {
      setOptTwo(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(!optOne || !optTwo){
      setValid(false)
    } else {
    props.dispatch(handleAddQuestion(optOne, optTwo));
    setToHome(true);
    }
  };

  if (toHome) return <Redirect to="/" />;

  return props.authedUser ? (
    <>
      <div className="card">
        <div className="login-welcome">
          <h2> Create New Question </h2>
        </div>
        <div className="new-question">
          <p>
            <small>Complete the question:</small>
          </p>
          <h3>Would You Rather...</h3>
          <form onSubmit={e => handleSubmit(e)}>
            <input
              type="text"
              value={optOne}
              placeholder="Option One.."
              onChange={e => handleChange(e, "one")}
              className="question-input"
            />
            <h5>OR..</h5>
            <input
              type="text"
              value={optTwo}
              placeholder="Option Two.."
              onChange={e => handleChange(e, "two")}
              className="question-input"
            />
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      {valid ? null : (
          <div className="invalid">
            <small>Make sure you type the 2 options!</small>
          </div>
        )}
    </>
  ) : (
    <Redirect to={{
    		pathname: "/login",
    		state: { referrer : '/add' }
  			}}  />
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
