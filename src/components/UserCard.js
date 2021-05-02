import { connect } from "react-redux";

const UserCard = (props) => {
  const { user } = props;

  return (
    <div className="user-card">
      <div className="user-avatar-div">
        <img
          src={user.avatarURL}
          alt={user.name + "s avatar"}
          className="user-avatar"
        />
      </div>
      <div className="separator"></div>
      <div className="user-details">
        <h3>{user.name}</h3>
        <div className="user-questions">
          <p>
            <small>Answered Questions : {user.answered} </small>
          </p>
        </div>
        <div className="user-questions">
          <p>
            <small>Created Questions : {user.created}</small>
          </p>
        </div>
      </div>
      <div className="separator"></div>
      <div className="scor-container">
        <div className="score-container-div">
          <div className="score-text">
            <p>Score</p>
          </div>
          <div className="score">
            <span>{user.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ users }, { id }) {
  const user = {
    ...users[id],
    score: users[id].questions.length + Object.keys(users[id].answers).length
  };
  return {
    user: {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
      score: user.score
    }
  };
}

export default connect(mapStateToProps)(UserCard);