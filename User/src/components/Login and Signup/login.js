import {
  IonContent,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonCard,
  IonCardContent,
  IonToast,
  IonIcon,
} from "@ionic/react";


import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebaseConfig";
import { mail } from "ionicons/icons";
import { async } from "@firebase/util";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInfo, setErrorInfo] = useState({});
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [busy, SetBusy] = useState(false);
  const  history = useHistory()

  const loginhandler = async(e) => {
    e.preventDefault();
    
    if(!email || !password){
      setErrorInfo({ showErrorToast: true, errMsg: "Email and Password are Required" });
    }
    else{
      try{
        const user = await signInWithEmailAndPassword(auth, email, password)
        if(user){
          setErrorInfo({ showErrorToast: true, errMsg: "Welcome" });
          history.push('/News')
        }
        
      }
      catch(error){
        setErrorInfo({ showErrorToast: true, errMsg: "Invalid Credentials" });
      }
      
    }
    // if ((email === "", password === "")) {
    //   return {};
    // }

    // console.log(email, password);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((cred) => {
    //     console.log("user cred", cred.user);
    //   })
    //   .catch((error) => {
    //     switch (errorInfo.code) {
    //       case "auth/email-already-in-use":
    //       case "auth/invalid-email":
    //         setEmailError(error.message);
    //         break;
    //       case "auth/weak-password":
    //         setPasswordError(error.message);
    //         break;
    //       default:
    //     }
    //     console.log(error.message);
    //     setErrorInfo({ showErrorToast: true, errMsg: error.message });

    //     return false;
    //   });
    // setEmail("");
    // setPassword("");
  };

  return (
    <IonContent fullscreen>
      <IonToolbar mode="ios">
        <IonTitle>Login</IonTitle>
      </IonToolbar>

      <div id="Loginheader">
        <h2>Fill In your Details</h2>
      </div>

      <div className="Loginwrapper">
        <IonCard className="Loginform-wrapper">
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                Email
              </IonLabel>
              <IonIcon> icon={mail} </IonIcon>
              <IonInput
                style={{}}
                value={email}
                onIonChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                Password
              </IonLabel>

              <IonInput
                style={{}}
                value={password}
                onIonChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              ></IonInput>
            </IonItem>

            <IonButton
              onClick={loginhandler}
              style={{ marginTop: 50 }}
              expand="full"
              shape="round"
              color="primary"
            >
              Login
            </IonButton>
          </IonCardContent>
          <div className="footer">
            <IonLabel style={{}}>
              New To App ? <Link to="/Register">Register</Link>
            </IonLabel>
          </div>
          <div className="Reset">
            <Link to="/Reset">Forgot Password</Link>
          </div>
        </IonCard>
      </div>
      <IonToast
        color="danger"
        isOpen={errorInfo.showErrorToast}
        onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
        message={errorInfo.errMsg}
        duration={2000}
      />
    </IonContent>
  );
};

export default Login;
