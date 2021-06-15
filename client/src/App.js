import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { fire } from './utils/fire'
import 'antd/dist/antd.css'; 
import './App.css'

//Routes
import AuthRoutes from './routes/AuthRoutes'
import NoAuthRoutes from './routes/NoAuthRoutes'
import NotAuthorized from './components/NotAuthorized';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authorized, setAuthorized] = useState(false)

	fire.auth().onAuthStateChanged(async (userRecord) => {
		if(userRecord) {
			console.log(userRecord)
			const token = await userRecord.getIdTokenResult()
			setIsLoggedIn(true)
			setAuthorized(token.claims.admin)
		} else {
			setIsLoggedIn(false)
		}
	})

	const signOut = () => {
		fire.auth().signOut() 
	}

  	return (
      	<Router>
			<Switch>
				{!isLoggedIn 
				? <Route component={() => <NoAuthRoutes />}/>
				: authorized
						? <Route component={() => <AuthRoutes onSignOut={signOut}/>} />
						: <NotAuthorized onSignOut={signOut}/>
				}
			</Switch>
      	</Router>
  );
}

export default App;
