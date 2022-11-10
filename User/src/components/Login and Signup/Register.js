import {
  IonContent,
  IonToolbar,
  IonHeader,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonCard,
  IonCardContent,
  IonToast,
  IonAvatar,
  useIonAlert,
  IonTextarea,
  IonSelectOption,
  IonSelect,
  IonIcon,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "./Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebaseConfig";

import { db, users } from "../Database/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

import { storage } from '../Database/firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import {Camera, CameraResultType} from '@capacitor/camera';

import { camera } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import UserContext from "../Sports-Categories/context";

const Register = (props) => {
  const history = useHistory();

  const [presentAlert] = useIonAlert();

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [errorInfo, setErrorInfo] = useState({});
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [userPhoto,setUserPhoto]= useState('');
  const [showImg, setShowImg]= useState('');


  const{userInfo,setUserInfo} = useContext(UserContext)

  const registerhandler = (e) => {
    e.preventDefault();
    

    if(!email || !password || !firstname || !lastname || !address || !gender || !contact){
      setErrorInfo({ showErrorToast: true, errMsg: "all fields are required" });
    }
    else{

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (cred) => {
          setUserId(cred.user.uid);
          console.log("User Credentials", cred.user);
  
          try {
            const docRef = await addDoc(
              collection(db, `User/Personal/${email}`),
              {
                User: email,
                name: firstname,
                surname: lastname,
                address: address,
                contact: contact,
                gender: gender,
              }
            );
            console.log("New User Successfully Added", docRef.email);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setErrorInfo({ showErrorToast: true, errMsg: error.message });
          return false;
        });
  
      history.push("/Sports");
    };

    

      if(!userPhoto )
      
      return;
      
        const imageRef = ref(storage, `profile/user/${email}`);
        uploadBytes(imageRef, userPhoto).then(()=>{
          setErrorInfo({ showErrorToast: true, errMsg: "Image Has been Added" });
        }).catch((e)=>{
          console.log('No image taken');
        }
      )
  }

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

     setUserPhoto(image.webPath);
    //  setShowImg(userPhoto);
     
     console.log(image.webPath);
  }
  
  



    

  return (
    <IonContent fullscreen>
      <IonHeader className="header-style" class="ion-no-border" mode="ios">
        <IonToolbar className="tool-bar" mode="ios">
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="Loginheader">
        <h2>Create Your Account</h2>
      </div>

      <IonAvatar className="Avatar">
        
        <img onClick={()=>takePicture()}
          alt="Picture"
          src={userPhoto}
        />
        
      </IonAvatar>
      

      <div className="Login">
        <IonCard className="Loginform-wrapper">
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                Email
              </IonLabel>
              <IonInput
                style={{}}
                value={email}
                required
                onIonChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              ></IonInput>
            </IonItem>
            <p className="errorMsg">{emailError}</p>

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
                required
              ></IonInput>
            </IonItem>
            <p className="errorMsg">{passwordError}</p>

            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                Confirm Password
              </IonLabel>
              <IonInput
                style={{}}
                value={checkPassword}
                onIonChange={(e) => setCheckPassword(e.target.value)}
                placeholder="Confirm Password"
                type="password"
                required
              ></IonInput>
            </IonItem>
            <p className="errorMsg">{passwordError}</p>

            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                First Name
              </IonLabel>
              <IonInput
                style={{}}
                value={firstname}
                onIonChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
                type="text"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                Last Name
              </IonLabel>
              <IonInput
                style={{}}
                value={lastname}
                onIonChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
                type="text"
              ></IonInput>
            </IonItem>

            <IonItem style={{ marginTop: 8 }}>
              <IonLabel position="stacked">Gender</IonLabel>
              <IonSelect
                placeholder="Select Your Gender"
                value={gender}
                onIonChange={(e) => setGender(e.target.value)}
              >
                <IonSelectOption value="Male">Male</IonSelectOption>
                <IonSelectOption value="Female">Female</IonSelectOption>
                <IonSelectOption value="Other">Other</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                Address
              </IonLabel>
              <IonTextarea
                style={{}}
                value={address}
                onIonChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              ></IonTextarea>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" class="item item-input">
                Contact Number
              </IonLabel>
              <IonInput
                style={{}}
                value={contact}
                onIonChange={(e) => setContact(e.target.value)}
                placeholder="Contact Number"
                type="number"
                max={10}
              ></IonInput>
            </IonItem>

            <IonButton
              onClick={registerhandler}
              style={{ margin: 30, marginTop: 50 }}
              expand="full"
              shape="round"
              color="success"
            >
              Register
            </IonButton>
          </IonCardContent>
          <div className="footer">
            <IonLabel style={{}}>
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

export default Register;
