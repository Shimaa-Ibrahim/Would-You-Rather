import { connect } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";

import { setAuthedUser } from "../actions/authedUser";
import logo from "../logo.svg";

const Login = (props) => {
  const [userID, setUserID] = useState("");
  const [valid, setValid] = useState(true);
  const referrer = props.location.state? props.location.state.referrer : '/'

  const handleChange = e => {
    e.preventDefault();
    setUserID(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO: dispatch autheduser then redirect
    if (!userID || !props.users.some(user => user.id === userID)) {
      setValid(false);
    } else {
      setValid(true);
      props.dispatch(setAuthedUser(userID));
      //localStorage.setItem('userID', userID);
    }
  };

  return props.authedUser ? (
    <Redirect to={ referrer } />
  ) : (
    <>
      <div className="card login-card">
        <div className="login-welcome">
          <h4>Welcome to the Would You Rather App!</h4>
          <p>
            <small>please sign in to continue</small>
          </p>
        </div>
        <img src={logo} alt="react logo" className="logo" />
        <div>
          <h2>Sign in</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <select value={userID} onChange={e => handleChange(e)}>
              <option value="" disabled>
                Select user
              </option>
              {props.users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.id}
                </option>
              ))}
            </select>
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
      {valid ? null : (
        <div className="invalid">
          <small>Please Select Vaild User!</small>
        </div>
      )}
    </>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: Object.values(users)
  };
}

export default connect(mapStateToProps)(Login);