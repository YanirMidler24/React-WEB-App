import React, { useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import Dashboard from "./Dashboard"

export default function Usermgmt() {
    const { currentUser } = useAuth()
    const history = useHistory()

    useEffect(() => {
        if(!currentUser.email.includes("admin"))
        {
            history.push("/")
        }
    }, [])
    const navigate = () => {
        history.push("/Users")
    }



    return (
        <>
        <Dashboard/>
        <div style={{marginBottom : "400px"}} >
            <h5 style={{ marginLeft: "425px" }}>User Managemt</h5>
            <br />
            <div className="w-100 text-center mt-2">
                <Link to="/">Back to home page </Link>
                <br />
                <strong className="w-100 text-center mt-2">Current Email </strong>{currentUser.email}
            </div>
            <div className="w-100 text-center mt-2">
                <Button variant="outline-info" style={{ border: "2px solid black", marginLeft: "5.5px" }} onClick={() => history.push("/add-user")}>add new user</Button>
                <Button variant="outline-info" style={{ border: "2px solid black", marginLeft: "5.5px" }} onClick={navigate} >Users List</Button>
            </div>
            <br />


        </div>
        </>
    )
}
