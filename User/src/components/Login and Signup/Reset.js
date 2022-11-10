import {
    IonContent, IonToolbar, IonHeader ,IonButton, 
    IonInput, IonItem, IonLabel, IonTitle, IonCard, 
    IonCardContent, IonToast
  } from "@ionic/react";
  import { Link, } from "react-router-dom";
  import { useState } from "react";
  import "./Login.css"
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../Database/firebaseConfig";
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";
  import { useHistory } from "react-router-dom";
  

  const Reset = () => {
      
    const auth = getAuth();
  
    const history = useHistory();
    const[email, setEmail]=useState("");
    const [errorInfo, setErrorInfo] = useState({});
    const [emailError, setEmailError] = useState("");
  
  
    const Resethandler = async (e) => {
      
        e.preventDefault()
    
        if(!email ){
          setErrorInfo({ showErrorToast: true, errMsg: "Email and Password are Required" });
        }
        

        else{

          try{
            const user = await sendPasswordResetEmail(auth, email,)
            if(user){
              setErrorInfo({ showErrorToast: true, errMsg: "Email Has been Sent to Associated email" });
              history.push('/News')
            }
            
          }
          catch(error){
            setErrorInfo({ showErrorToast: true, errMsg: "Invalid Email Address" });
          }
          
        }
        
        
    }
  
    return (
      <IonContent fullscreen>
        <IonHeader className="header-style" class="ion-no-border" mode="ios">
          <IonToolbar className="tool-bar" mode="ios">
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <div id="Loginheader">
          <h2>Reset Your Password</h2>
        </div>
  
        <div className="Login">
          <IonCard className="Loginform-wrapper">
            <IonCardContent>
              
              
              <IonItem >
                <IonLabel position="stacked" class="item item-input">
                  Email
                </IonLabel>
                <IonInput
                  style={{}}
                  value={email}
                  onIonChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your email "
                  type="email"
                  required
                ></IonInput>
              </IonItem>
              <p color="danger" className="errorMsg">{emailError}</p>
  
              
              <IonButton
                onClick={Resethandler}
                style={{ margin: 30, marginTop: 50 }}
                expand="full"
                shape="round"
                color="success"
              >
                Reset
              </IonButton>
              
             
              
              
            </IonCardContent>

            <div className="footer">
              <IonLabel style={{ }}>
                Login Instead <Link to="/login">Login</Link>
              </IonLabel>
              </div>

          </IonCard>
        </div>
        <IonToast
            color="danger"
            isOpen={errorInfo.showErrorToast}
            onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
            message={errorInfo.errMsg}
            duration={3000}
          />
      </IonContent>
    );
  };
  
  export default Reset;