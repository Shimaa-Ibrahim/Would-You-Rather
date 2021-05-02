import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => {
  const path = props.location.pathname;
  const { user } = props;

  const handleClick = () => {
    props.dispatch(setAuthedUser(null));
    //localStorage.removeItem('userID');
  };

  return (
    <>
      <ul className="nav">
        <span className="nav-div">
          <li className={path === "/" ? "active-link" : ""}>
            <NavLink to="/" exact activeClassName="active" className="link">
              Home
            </NavLink>
          </li>
          <li className={path === "/add" ? "active-link" : ""}>
            <NavLink to="/add" exact activeClassName="active" className="link">
              New Question
            </NavLink>
          </li>
          <li className={path === "/leaderboard" ? "active-link" : ""}>
            <NavLink
              to="/leaderboard"
              exact
              activeClassName="active"
              className="link"
            >
              Leader Board
            </NavLink>
          </li>
        </span>
        <span className="nav-div">
          {props.authedUser ? (
            <>
              <li>
                {user.name}
                <img
                  src={user.avatarURL}
                  alt={user.name}
                  className="nav-avatar"
                />
              </li>
              <li onClick={handleClick}>Logout</li>
            </>
          ) : (
            <li className={path === "/login" ? "active-link" : ""}>
              <NavLink
                to="/login"
                exact
                activeClassName="active"
                className="link"
              >
                Login
              </NavLink>
            </li>
          )}
        </span>
      </ul>
    </>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: authedUser ? users[authedUser] : null
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
