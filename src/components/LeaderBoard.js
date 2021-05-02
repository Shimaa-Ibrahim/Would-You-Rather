import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import UserCard from "./UserCard";

const LeaderBoard = (props) => {
  return props.authedUser ? (
    <div>
      {props.users.map(id => (
        <UserCard key={id} id={id} />
      ))}
    </div>
  ) : (
    <Redirect to={{
    		pathname: "/login",
    		state: { referrer : '/leaderboard' }
  			}} 
	/>
  );
};

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users: Object.keys(users).sort(
      (a, b) =>
        users[b].questions.length +
        Object.keys(users[b].answers).length -
        (users[a].questions.length + Object.keys(users[a].answers).length)
    )
  };
}

export default connect(mapStateToProps)(LeaderBoard);
