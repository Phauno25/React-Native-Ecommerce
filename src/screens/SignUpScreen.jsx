import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import globalStyles from "../global/globalStyles";
import { useSignUpMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import validations from "../utils/validations";
import CustomText from "../components/CustomText";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [status, setStatus] = useState("ready");
  const [statusError, setStatusError] = useState("");

  const [triggerSignUp, result] = useSignUpMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
        })
      );
    }
  }, [result]);

  const onSubmit = () => {
    try {
      const isValidVariableEmail = validations.isValidEmail(email);
      const isCorrectPassword = validations.isAtLeastSixCharacters(password);
      const isRepeatedPasswordCorrect = password === confirmPassword;

      if (
        isValidVariableEmail &&
        isCorrectPassword &&
        isRepeatedPasswordCorrect
      ) {
        const request = {
          email,
          password,
          returnSecureToken: true,
        };
        triggerSignUp(request)
          .then((e) => {
            if (e.error) {
              switch (e.error.status) {
                case 400:
                  setStatusError(
                    "Email is already registered in the database."
                  );
                  break;
                case 500:
                  setStatusError("Server is down, please try again later.");
                  break;
                default:
                  break;
              }
              setStatus("ready");
            }
          })
          .catch(() => {
            setStatusError("Server is down, please try again later.");
            setStatus("ready");
          });
      }

      if (!isValidVariableEmail) setErrorMail("Email is not correct");
      else setErrorMail("");
      if (!isCorrectPassword)
        setErrorPassword("Password must be at least 6 characters");
      else setErrorPassword("");
      if (!isRepeatedPasswordCorrect)
        setErrorConfirmPassword("Passwords must match");
      else setErrorConfirmPassword("");
    } catch (err) {
      console.log("Catch error");
      console.log(err.message);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <CustomText style={styles.title}>Signup</CustomText>
        <InputForm label={"email"} onChange={setEmail} error={errorMail} />
        <InputForm
          label={"password"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"confirm password"}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <CustomText style={styles.error}>{statusError}</CustomText>
        {status === "loading" ? (
          <CustomText>Loggin in...</CustomText>
        ) : (
          <SubmitButton onPress={onSubmit} title="Send" />
        )}

        <CustomText style={styles.sub}>Already have an account?</CustomText>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <CustomText>Login</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalStyles.lightPink,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
  },
  sub: {
    fontSize: 14,
    color: "black",
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
  error: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
  },
});
