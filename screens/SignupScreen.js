import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../store/Auth-context";
const SignupScreen = ({navigation}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      // const token = await createUser(email, password);
      const result = await createUser(email, password);
      // authCtx.authenticate(token);
      authCtx.authenticate(result)
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert(
        "Authenticated failed",
        "could not log you in Please check credentials or try again later"
      );
    }

    setIsAuthenticating(false);
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="creating user ..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
