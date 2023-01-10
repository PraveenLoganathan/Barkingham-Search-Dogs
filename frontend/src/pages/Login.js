import React, { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import InfoAlert from "../components/Alert";
import Input from "../components/Input";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";
import mongoAPI from "../api/mongoAPI";
import { AuthContext } from "../App";

// Define a reducer function to update the state based on different actions
function loginReducer(state, action) {
  //console.log(action.type);
  switch (action.type) {
    // Update the field specified in the action with the provided value
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    // Set the authenticated field in the state to true
    case "login_success":
      return {
        ...state,
        authenticated: true,
      };
    // Set the error field in the state to the provided error message
    case "login_error":
      return {
        ...state,
        error: action.error,
      };
    default:
      throw new Error("Invalid action type");
  }
}

function Login() {
  const { setAuthenticated } = useContext(AuthContext);
  // Use the useReducer hook to manage state with the defined loginReducer function
  const [state, dispatch] = useReducer(loginReducer, {
    username: "",
    password: "",
    error: null,
  });

  const navigate = useNavigate();
  // User is navigated to the search breeds page upon successful login
  const navigateToBreeds = () => {
    navigate("/breeds");
  };

  const attemptLogin = async (event) => {
    event.preventDefault();

    // If either the username or password field is empty, set an error in the state
    if (!state.username || !state.password) {
      dispatch({
        type: "login_error",
        error: "Please enter a username and password",
      });
      return;
    }
    // Send a POST request to the server with the provided username and password
    try {
      const response = await mongoAPI.attemptLogin(
        state.username,
        state.password
      );
      if (!response.error) {
        setAuthenticated(true);
        navigateToBreeds();
      } else {
        dispatch({
          type: "login_error",
          error: "An error occurred whilst logging in. Please try again later.",
        });
      }
    } catch (error) {
      dispatch({
        type: "login_error",
        error: "An error occurred whilst logging in. Please try again later.",
      });
    }
  };

  // Update the state field specified in the event target's name with the target's value
  const handleFieldChange = (event) => {
    dispatch({
      type: "field",
      field: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <FormContainer>
      <form>
        <h3 className="text-brown text-xl text-center mt-8 mb-8">
          Welcome back!
        </h3>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={state.username}
          onChange={handleFieldChange}
          autoComplete="on"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleFieldChange}
          autoComplete="current-password"
        />
        {state.error && <InfoAlert message={state.error} color="red" />}
        <Button text={"Login"} onClick={attemptLogin} />
        <LinkButton
          to="/register"
          text="Register"
          prefix="Don't have a account?"
        />
      </form>
    </FormContainer>
  );
}

export default Login;
