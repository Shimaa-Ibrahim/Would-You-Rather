import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddAnswer } from "../actions/shared";
import Error404 from './Error404'

const Poll = (props) => {
  const [userAns, setUserAns] = useState("");
  const [valid, setValid] = useState(true);

  if (!props.authedUser) return <Redirect to={{
    		pathname: "/login",
    		state: { referrer : '/questions/' + props.match.params.id }
  			}}  />;
  if(!props.exist) return <Error404 />

  const { answer, question, authedUser, dispatch } = props;
  const { optionOne, optionTwo } = question;
  const votes = optionOne.votes.length + optionTwo.votes.length;
  const author = question ? question.authorDetails : null;

  const handleChange = e => {
    setUserAns(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(!userAns) {
      setValid(false)
    }
    else {
      setValid(true)
      dispatch(
        handleAddAnswer({
          authedUser,
          qid: question.id,
          answer: userAns
        })
     );
    }
  }

  return answer ? (
    <div className="card">
      <div className="poll-author">{"Asked By " + author.name}</div>
      <div className="poll-flex">
        <div className="poll-avatar-div">
          <img
            src={"/" + author.avatarURL}
            alt={author.name + " avatar"}
            className="ans-poll-avatar"
          />
        </div>
        <div className="poll-seperator"></div>
        <div className="poll-result">
          <h2>Results</h2>
          <div
            className={
              optionOne.votes.includes(authedUser)
                ? "ans-poll-option-active"
                : "ans-poll-option"
            }
          >
            <div
              className="your-vote"
              style={{
                display: optionOne.votes.includes(authedUser) ? "block" : "none"
              }}
            >
              your vote
            </div>
            <h5>{"Would You Rather " + optionOne.text + "?"}</h5>
            <div className="poll-res-percentage">
              <div
                style={{
                  width: (optionOne.votes.length / votes) * 100 + "%",
                  backgroundColor: "#00ccaa",
                  height: "100%",
                  borderRadius: "5px"
                }}
              ></div>
              <p>
                <small>
                  {((optionOne.votes.length / votes) * 100).toFixed(1) + "%"}
                </small>
              </p>
            </div>
            <p className="vote">
              {optionOne.votes.length + " out of " + votes + " votes"}
            </p>
          </div>

          <div
            className={
              optionTwo.votes.includes(authedUser)
                ? "ans-poll-option-active"
                : "ans-poll-option"
            }
          >
            <div
              className="your-vote"
              style={{
                display: optionTwo.votes.includes(authedUser) ? "block" : "none"
              }}
            >
              your vote
            </div>
            <h5>{"Would You Rather " + optionTwo.text + "?"}</h5>
            <div className="poll-res-percentage">
              <div
                style={{
                  width: (optionTwo.votes.length / votes) * 100 + "%",
                  backgroundColor: "#00ccaa",
                  height: "100%",
                  borderRadius: "5px"
                }}
              ></div>
              <p>
                <small>
                  {((optionTwo.votes.length / votes) * 100).toFixed(1) + "%"}
                </small>
              </p>
            </div>
            <p className="vote">
              {optionTwo.votes.length + " out of " + votes + " votes"}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
    <div className="card">
      <div className="poll-author">{author.name + " asks:"}</div>
      <div className="poll-flex">
        <div className="poll-avatar-div">
          <img
            src={"/" + author.avatarURL}
            alt={author.name + " avatar"}
            className="unans-poll-avatar"
          />
        </div>
        <div className="un-poll-seperator"></div>
        <div className="poll-question">
          <h3>Would You Rather...</h3>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="radio-container">
              <input
                id="opt-one"
                type="radio"
                value="optionOne"
                checked={userAns === "optionOne"}
                onChange={e => handleChange(e)}
              />
              <label htmlFor="opt-one">{optionOne.text}</label>
            </div>
            <div className="radio-container">
              <input
                id="opt-two"
                type="radio"
                value="optionTwo"
                checked={userAns === "optionTwo"}
                onChange={e => handleChange(e)}
              />
              <label htmlFor="opt-two">{optionTwo.text}</label>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
	{valid ? null : (
        <div className="invalid">
          <small>Please choose an answer!</small>
        </div>
      )}
	</>
  );
};

function mapStateToProps({ users, questions, authedUser }, ownProps) {
  const { id } = ownProps.match.params;
  const exist = Object.keys(questions).includes(id) && authedUser
  const question = exist? {
          ...questions[id],
          authorDetails: users[questions[id].author]
  }: null

  const answer = exist? Object.keys(users[authedUser].answers).includes(id) : null
  
  return {
    	exist,
        authedUser,
        question,
        answer
      }
}

export default connect(mapStateToProps)(Poll);