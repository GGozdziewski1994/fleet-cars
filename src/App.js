import Layout from "./Layout/Layout";
import AuthForm from "./components/Auth/AuthForm";
import Cars from "./components/Cars/Cars";
import AuthContext from "./context/auth-contex";
import { useContext } from "react";

const App = () => {
  const authContext = useContext(AuthContext);

  return (
      <Layout>
          {!authContext.isLoggedIn && <AuthForm/>}
          {authContext.isLoggedIn && <Cars/>}
      </Layout>
  );
}

export default App;
