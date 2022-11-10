import { React, useState } from "react";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonTabBar,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Sports from "./pages/Sports";
import Golf from "./components/Sports-Categories/Golf/Golf";
import Hockey from "./components/Sports-Categories/Hockey/Hockey";
import Esports from "./components/Sports-Categories/Esports/Esports";
import Rugby from "./components/Sports-Categories/Rugby/Rugby";
import BasketBall from "./components/Sports-Categories/Basketball/Basketball";
import Tennis from "./components/Sports-Categories/Tennis/Tennis";
import Soccer from "./components/Sports-Categories/Soccer/Soccer";
import Netball from "./components/Sports-Categories/Netball/NetBall";
import Volleyball from "./components/Sports-Categories/Volleyball/VolleyBall";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/Database/firebaseConfig";
import Boxing from "./components/Sports-Categories/Boxing/Boxing";

import { getAuth } from "firebase/auth";
import Login from "./components/Login and Signup/login";
import Register from "./components/Login and Signup/Register";
import Reset from "./components/Login and Signup/Reset";
import UserContext from "./components/Sports-Categories/context";
import Menu from "./pages/Menu";
import News from "./pages/News";
import Trials from "./pages/Trials";
import Settings from "./pages/Settings";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";


setupIonicReact();

const App = () => {

  const[chooseSport, setChooseSport] = useState('')

  const [user, setUser] = useState();
  const[userInfo, setUserInfo] = useState([])
  
  const auth = getAuth();
  // const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <IonApp>
      <IonReactRouter>

        <UserContext.Provider value={{userInfo: userInfo, setUserInfo: setUserInfo}}>

        <IonRouterOutlet>
                   
          <Route exact={true} path="/Register">
            <Register />
          </Route>

          <Route exact={true} path="/Sports">
            <Sports />
          </Route>

          <Route exact={true} path="/Reset">
            <Reset />
          </Route>
        
          <Route exact={true} path="/Login">
             <Login/> 
          </Route>   

          <Route path='/Menu'>
            <Menu/>
          </Route>
          <Route path='/Trials'>
            <Trials/>
          </Route>
          <Route path='/News'>
            <News/>
          </Route>
          <Route path='/Settings'>
            <Settings/>
          </Route>
          <Route exact path='/'>
            <Redirect to='/Menu'/>
          </Route>   
      
          <Route path="/BasketBall" exact={true} component={BasketBall} />
          <Route path="/Soccer" exact={true} component={Soccer} />
          <Route path="/Rugby" exact={true} component={Rugby} />
          <Route path="/Hockey" exact={true} component={Hockey} />
          <Route path="/Golf" exact={true} component={Golf} />
          <Route path="/Esports" exact={true} component={Esports} />
          <Route path="/Boxing" exact={true} component={Boxing} />
          <Route path="/Tennis" exact={true} component={Tennis} />
          <Route path="/VolleyBall" exact={true} component={Volleyball} />
          <Route path="/NetBall" exact={true} component={Netball} />

          <Redirect exact from="/" to="/login" />
        </IonRouterOutlet>
        </UserContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
