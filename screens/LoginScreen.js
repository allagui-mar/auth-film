import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useContext, useState } from "react";
import { login } from "../util/Auth";
import { Alert } from "react-native";

import { AuthContext } from "../store/Auth-context";
const LoginScreen = ({ navigation }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
 
  const authCtx = useContext(AuthContext);
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {

      const result = await login(email, password);
      authCtx.authenticate(result);
      // navigation.navigate('AuthenticatedStack', { screen: 'Welcome' });
      // navigation.navigate('Welcome');


    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later."
      );
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="login you in ..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
