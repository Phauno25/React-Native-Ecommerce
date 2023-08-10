import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import globalStyles from "../global/globalStyles";
import validations from "../utils/validations";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authServices";
import { setUser } from "../features/user/userSlice";
import CustomText from "../components/CustomText";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("ready");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [statusError, setStatusError] = useState("");

  const dispatch = useDispatch();

  const [triggerSignIn, resultSignIn] = useSignInMutation();

  useEffect(() => {
    if (resultSignIn.isSuccess) {
      dispatch(
        setUser({
          email: resultSignIn.data.email,
          idToken: resultSignIn.data.idToken,
          localId: resultSignIn.data.localId,
          profileImage: "",
          location: {},
        })
      );
    }
  }, [resultSignIn]);

  const onSubmit = () => {
    const isValidVariableEmail = validations.isValidEmail(email);
    const isCorrectPassword = validations.isAtLeastSixCharacters(password);

    if (isValidVariableEmail && isCorrectPassword) {
      setStatus("loading");
      setStatusError("");
      triggerSignIn({
        email,
        password,
        returnSecureToken: true,
      })
        .then((e) => {
          if (e.error) {
            console.log(e.error.data)
            switch (e.error.status) {
              case 400:
                setStatusError("Incorrect email or password.");
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

    if (!isValidVariableEmail) setErrorEmail("Email is not correct");
    else setErrorEmail("");
    if (!isCorrectPassword)
      setErrorPassword("Password must be at least 6 characters");
    else setErrorPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <CustomText>Login to start</CustomText>
        <InputForm
          label={"Email"}
          onChange={(email) => setEmail(email)}
          error={errorEmail}
        />
        <InputForm
          label={"Password"}
          onChange={(password) => setPassword(password)}
          error={errorPassword}
          isSecure={true}
        />
        <CustomText style={styles.error}>{statusError}</CustomText>
        {status === "loading" ? (
          <CustomText>Loggin in...</CustomText>
        ) : (
          <SubmitButton onPress={onSubmit} title="Log In" />
        )}
        <CustomText> Not have an account?</CustomText>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <CustomText>Sign up</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalStyles.color.white,
  },
  form: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: globalStyles.color.background,
  },
  sub: {
    fontSize: 14,
    color: "black",
  },
  error: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
  },
});
