import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import InfoAlert from "../components/Alert";
import InputField from "../components/Input";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";
import mongoAPI from "../api/mongoAPI";

// The reducer function is used to update the state based on the action type
function reducer(state, action) {
  switch (action.type) {
    // Update the field specified in the action with the provided value
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    // Set the error in the state to the provided error message
    case "register_success":
      return {
        ...state,
        registered: true,
      };
    // Set the error in the state to the provided error message
    case "missing_details":
      return {
        ...state,
        error: action.error,
      };
    // Set the error in the state to the provided error message
    case "password_mismatch":
      return {
        ...state,
        error: action.error,
      };
    default:
      throw new Error("Invalid action type");
  }
}

function Register() {
  // Use the useReducer hook to manage state with the defined reducer function
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    confirmPassword: "",
    registered: false,
    error: null,
  });

  // Update the state field specified in the event target's name with the target's value
  const handleFieldChange = (event) => {
    dispatch({
      type: "field",
      field: event.target.name,
      value: event.target.value,
    });
  };

  useEffect(() => {
    // Navigate to the login page if the registered state changes to true
    if (state.registered) {
      navigateToLogin();
    }
  }, [state.registered]);

  const navigate = useNavigate();
  // User is navigated to the search breeds page upon successful account creation
  const navigateToLogin = () => {
    navigate("/login");
  };

  // Attempt to register a new user with the provided username and password
  const attemptRegister = async (event) => {
    event.preventDefault();

    // If either the username or password field is empty, set an error in the state
    if (!state.username || !state.password) {
      dispatch({
        type: "missing_details",
        error: "Please enter a username and password",
      });
      return;
    }

    // If the confirm password field is empty or the password and confirm password do not match, set an error in the state
    if (!state.confirmPassword || !state.password) {
      dispatch({
        type: "password_mismatch",
        error: "Passwords don't match",
      });
      return;
    }
    // Send a POST request to the server with the provided username and password
    try {
      const response = await mongoAPI.attemptRegister(
        state.username,
        state.password
      );
      if (!response.error) {
        dispatch({ type: "register_success" });
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "register_error",
        error:
          "An error occurred whilst creating account. Please try again later.",
      });
    }
  };

  // Check if the passwords match on every change to either password input
  React.useEffect(() => {
    if (state.password !== state.confirmPassword) {
      dispatch({ type: "password_mismatch", error: "Passwords do not match" });
    } else {
      dispatch({ type: "password_mismatch", error: null });
    }
  }, [state.password, state.confirmPassword]);

  return (
    <FormContainer>
      <form>
        <h3 className="text-brown text-xl text-center mt-8 mb-8">Sign up</h3>
        <InputField
          type="text"
          name="username"
          placeholder="Username"
          value={state.username}
          onChange={handleFieldChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleFieldChange}
        />
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={handleFieldChange}
        />
        {state.error && <InfoAlert message={state.error} color="red" />}
        <Button text={"Register"} onClick={attemptRegister} />
        <LinkButton
          to="/login"
          text="Login"
          prefix="Already have an account?"
        />
      </form>
    </FormContainer>
  );
}

export default Register;
