import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { clearErrors } from "../../../actions/authActions";
import { getAllUsers, updateUser } from "../../../actions/userActions";
import { loadUser } from "../../../actions/authActions";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";

import NavBar from "../../layout/NavBar";
import Loader from "../../layout/Loader";

const AllUsers = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    users: allUsers,
    error,
  } = useSelector((state) => state.allUsers);
  const {
    loading: updateLoading,
    success,
    error: updateError,
  } = useSelector((state) => state.updateUser);
  const { user } = useSelector((state) => state.auth);

  const changeRole = (e, user, role) => {
    e.preventDefault();
    const userData = {
      userName: user.userName,
      role: role,
    };

    dispatch(updateUser(userData, user._id));
  };

  useEffect(() => {
    if (user.role !== "admin" && user.role !== "god") {
      navigate("/");
    }

    dispatch(getAllUsers());

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("successfully updated");
      dispatch(getAllUsers());
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(loadUser());
    }
  }, [dispatch, alert, error, updateError, success, user.role, navigate]);
  //Settings for slider
  const settings = {
    dots: true,
    infinite: false,
    speed: 850,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  // Filter the users by role
  const admins = allUsers.filter(
    (user) => user.role === "admin" || user.role === "god"
  );
  const Users = allUsers.filter((user) => user.role === "user");

  return (
    <Fragment>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="all-users-container">
            <NavBar />
            <div className="all-users-content-container">
              <div className="all-users-header">
                <h1 className="headings">All-Users</h1>
                <h1 className="headings">
                  Total-Users = {allUsers && allUsers.length}
                </h1>
                <div className="user-card-header">
                  <h2>Admins = {admins && admins.length}</h2>
                </div>
                <br />
              </div>
              <Slider {...settings}>
                {admins.map((user) => (
                  <div className="all-users-body" key={user._id}>
                    <div className="user-account-card">
                      <img src="images/avatar.png" alt="avatar" />
                      <h4 className="all-users-username">{user.userName}</h4>
                      <div className="per">
                        <select
                          id="all-users-standard-select"
                          onChange={(e) => changeRole(e, user, e.target.value)}
                        >
                          <option>
                            {user.role === "god" ? "admin" : user.role}
                          </option>
                          <option>
                            {user.role === "admin" || user.role === "god"
                              ? "user"
                              : user.role === "user" && "admin"}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <br />
              <br />
              <br />
              <div className="user-card-header">
                <h2>Users = {Users && Users.length}</h2>
              </div>
              <br />
              <Slider {...settings}>
                {Users.map((user) => (
                  <div className="all-users-body" key={user._id}>
                    <div className="user-account-card">
                      <img src="images/avatar.png" alt="avatar" />
                      <h4 className="all-users-username">{user.userName}</h4>
                      <div className="per">
                        <select
                          id="all-users-standard-select"
                          onChange={(e) => changeRole(e, user, e.target.value)}
                        >
                          <option>
                            {user.role === "god" ? "admin" : user.role}
                          </option>
                          <option>
                            {user.role === "admin" || user.role === "god"
                              ? "user"
                              : user.role === "user" && "admin"}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllUsers;
