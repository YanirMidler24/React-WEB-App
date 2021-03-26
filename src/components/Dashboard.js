import React, { useState, useEffect, useContext } from "react"
import { Card, Button, Navbar, Nav } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { CounterContext } from '../contexts/ContextData'

export default function Dashboard() {
  // const { users} = useContext(CounterContext)
  const { currentUser, logout } = useAuth()
  const [usermgmtView, setUsermgmtView] = useState(true)
  const [subview, setSubview] = useState(true)
  const [movieView, setMovieView] = useState(true)
  const [premissions, setPremissions] = useState([""])
  const [counter, setCounter] = useState(0)
  const [error, setError] = useState("")
  const [id, setId] = useState("")
  const history = useHistory()
  const [email] = useState(currentUser.email)
  const [users] = useState(JSON.parse(sessionStorage["users"]))




  useEffect(() => {
    users.forEach(doc => {
      if (doc.email == email) {
        setPremissions(doc.premissions)
        setId(doc.id)
      }
      setCounter(counter + 1)
    })
  }, [])

  useEffect(() => {
    if (currentUser.email.includes("admin")) {

      setUsermgmtView(false)
      setMovieView(false)
      setSubview(false)

    }

    //Movies list
    if (premissions.includes("view movies")) {
      setMovieView(false)
    }
    else {
      console.log("no view movie")
    }

    //view Subscription
    if (premissions.includes("view subscriptions")) {
      setSubview(false)
    }
    else {
      console.log("no view subscriptions")
    }
  }, [counter])







  const navigateSub = () => {
    sessionStorage["premissions"] = premissions
    history.push("/Subscriptions")

  }
  const navigate = () => {
    sessionStorage["sub"] = true
    sessionStorage["premissions"] = premissions
    sessionStorage["id"] = id
    history.push("/movies")
  }

  async function handleLogout() {
    history.push("/")
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }




  return (
    <>
      <div style={{ marginInline: "280px", marginRight: "8px" }} className="text-center"  >
        <strong style={{ marginRight: "300px" }} >Email: {currentUser.email}  </strong>

        <div style={{ marginRight: "5px" }}>
          <strong>

            <Navbar style={{ marginLeft: "8px" }} bg="blac" expand="lg" >
              <Nav className="mr-auto">
                <Nav.Link hidden={usermgmtView} onClick={() => history.push("/Usermgmt")} >User mgmt</Nav.Link>
                <Nav.Link hidden={movieView} onClick={navigate} >Movies list</Nav.Link>
                <Nav.Link hidden={subview} onClick={navigateSub} >Subscriptions</Nav.Link>
                <Nav.Link type="sbumit" onClick={handleLogout}>Log Out</Nav.Link>
              </Nav>
            </Navbar>
          </strong>
        </div>
      </div>
    </>
  )
}