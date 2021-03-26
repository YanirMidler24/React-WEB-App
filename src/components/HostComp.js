import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import Movies from "./Movies"
import Admin from "./Admin"
import Usermgmt from "./Usermgmt"
import Users from "./Users"
import EditUser from "./EditUser"
import Subscriptions from "./Subscriptions"
import PrivateRoute from "./PrivateRoute"
import EditMoviesComp from "./editMovies"
import AddMovie from "./addMovie"
import { CounterContextProvider } from '../contexts/ContextData'
import AddMembers from "./addmember"
import EditMember from "./editMember"
import ViewSubMovie from "./viewSubMovie"
function HostComp() {

  return (
    <div style={{ backgroundColor: "silver",backgroundImage :`url("https://assets.wallpapersin4k.org/uploads/2017/04/Plain-White-Wallpaper-HD-5.jpg")` }}>

      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "1000px" }}>
          <h2 style={{ marginInline: "260px"}}  >Movies - Subscriptions Web Site</h2>
          
          <Router>
            <AuthProvider>
              <CounterContextProvider>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/edit-user/:id" component={EditUser} />
                  <Route path="/movies" component={Movies} />
                  <Route path="/add-user" component={Admin} />
                  <Route path="/Usermgmt" component={Usermgmt} />
                  <Route path="/Users" component={Users} />
                  <Route path="/Subscriptions" component={Subscriptions} />
                  <Route path="/addMember" component={AddMembers} />
                  <Route path="/editMovies/:id" component={EditMoviesComp} />
                  <Route path="/addMovie" component={AddMovie} />
                  <Route path="/EditMember/:id" component={EditMember} />
                  <Route path="/viewSubMovie/:id" component={ViewSubMovie} />
                </Switch>
              </CounterContextProvider>
            </AuthProvider>
          </Router>
        </div>

      </div>
    </div>


  )
}

export default HostComp