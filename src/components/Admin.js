import React, { useState, useEffect, useContext } from 'react'
import { db } from "../firebase"
import { Card, Form, Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { CounterContext } from '../contexts/ContextData'
import { useAuth } from "../contexts/AuthContext"
import Dashboard from "./Dashboard"

export default function Admin() {
    const [email, setEmail] = useState("")
    const [fname, setFname] = useState("")
    const [checked, setChecked] = useState(false)
    const [session, setSession] = useState("40")
    const [premissions, setPremissions] = useState([])
    const [viewSubAuto, setViewSubAuto] = useState(0)
    const [viewMovAuto, setViewMovAuto] = useState(0)
    const history = useHistory()
    const { premissionsList, countUser, setCountUser } = useContext(CounterContext)
    const { currentUser } = useAuth()


    useEffect(() => {
        if (currentUser.email.includes("admin")) {
            console.log("ok")
        }
        else {
            history.push("/")

        }
    }, [])

    useEffect(() => {

        if (viewMovAuto == 3)
        {
            let arr = [...premissions]
            arr.push("view movies")
            setPremissions(arr)
    
        }


    }, [viewMovAuto])
    useEffect(() => {

        if (viewSubAuto == 3)
        {
            let arr = [...premissions]
            arr.push("view subscriptions")
            setPremissions(arr)
    
        }


    }, [viewSubAuto])




    const navigate = () => {
        history.push("/Usermgmt")
    }
    const GetEmail = (e) => {
        setEmail(e.target.value)

    }
    const GetName = (e) => {
        setFname(e.target.value)
    }
    const addMgmt = (e) => {
        setChecked(e)

        if (e) {
            setSession("60");
        }

        else {
            setSession("40");
        }

    }

    const addUser = async () => {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        const data = []
        snapshot.forEach(doc => {
            data.push(doc.data().email);


        })
        if (!data.includes(email)) {

            const ID = data.length + 1
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            await usersRef.add({
                email: email,
                Full_Name: fname,
                id: ID,
                Created_time: dateTime,
                Manager: checked,
                session_time_in_min: session,
                premissions: premissions,
                uid: ""

            })



            alert("email added to the DataBase...")
            await setCountUser(countUser + 1)
            history.push("/users")
        }
        else {
            console.log("email already in the DataBase...")
        }

    }
    let subFlag
    if (viewSubAuto === 3) {
        subFlag = true


    }

    let movieFlag
    if (viewMovAuto === 3) {
        movieFlag = true
    }




    const view_movies = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("view movies")
            setPremissions(arr)
        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("view movies")
            setPremissions(arr)

        }
    }
    const update_movies = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("update movies")
            setPremissions(arr)
            setViewMovAuto(viewMovAuto + 1)
        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("update movies")
            setPremissions(arr)
            setViewMovAuto(viewMovAuto - 1)


        }
    }
    const delete_movies = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("delete movies")
            setPremissions(arr)
            setViewMovAuto(viewMovAuto + 1)

        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("delete movies")
            setPremissions(arr)
            setViewMovAuto(viewMovAuto - 1)


        }
    }
    const create_movies = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("create movies")
            setPremissions(arr)
            setViewMovAuto(viewMovAuto + 1)

        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("create movies")
            setPremissions(arr)
            setViewMovAuto(viewMovAuto - 1)

        }
    }
    const update_subs = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("update subscriptions")
            setPremissions(arr)
            setViewSubAuto(viewSubAuto + 1)

        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("update subscriptions")
            setPremissions(arr)
            setViewSubAuto(viewSubAuto - 1)

        }
    }
    const view_subs = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("view subscriptions")
            setPremissions(arr)
        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("view subscriptions")
            setPremissions(arr)

        }

    }
    const delete_subs = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("delete subscriptions")
            setPremissions(arr)
            setViewSubAuto(viewSubAuto + 1)

        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("delete subscriptions")
            setPremissions(arr)
            setViewSubAuto(viewSubAuto - 1)


        }
    }
    const create_subs = (e) => {
        if (e === true) {
            let arr = [...premissions]
            arr.push("create subscriptions")
            setPremissions(arr)
            setViewSubAuto(viewSubAuto + 1)
        }
        else if (e === false) {
            let arr = [...premissions]
            arr.pop("create subscriptions")
            setPremissions(arr)
            setViewSubAuto(viewSubAuto - 1)


        }
    }


    return (
        <>
            <Dashboard />

            <Card style={{ maxWidth: "500px", marginLeft: "220px" }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add New User!</Modal.Title>
                    </Modal.Header>
                </Modal.Dialog>
                <Modal.Body>
                    <Card.Body>

                        <Form.Group>
                            <Form.Label>Enter Email address</Form.Label>
                            <Form.Control placeholder="Enter Email..." type="text" onChange={GetEmail}></Form.Control>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter Full Name</Form.Label>
                            <Form.Control placeholder="Enter Full Name..." type="text" onChange={GetName}></Form.Control>

                        </Form.Group>
                        <Form.Group>
                            <Form.Check label="Manager?" type="checkbox" onChange={(e) => addMgmt(e.target.checked)} ></Form.Check>
                        </Form.Group>
                        {
                            premissionsList.map((x, index) => {
                                return <Form.Group key={index} >

                                    <Form.Check label={x.view_movies} checked={movieFlag} onChange={(e) => view_movies(e.target.checked)} />
                                    <Form.Check label={x.update_movies} onChange={(e) => update_movies(e.target.checked)} />
                                    <Form.Check label={x.delete_movies} onChange={(e) => delete_movies(e.target.checked)} />
                                    <Form.Check label={x.create_movies} onChange={(e) => create_movies(e.target.checked)} />
                                    <Form.Check label={x.view_subs} checked={subFlag} onChange={(e) => view_subs(e.target.checked)} />
                                    <Form.Check label={x.update_subs} onChange={(e) => update_subs(e.target.checked)} />
                                    <Form.Check label={x.delete_subs} onChange={(e) => delete_subs(e.target.checked)} />
                                    <Form.Check label={x.create_subs} onChange={(e) => create_subs(e.target.checked)} />
                                </Form.Group >
                            })
                        }

                        <Modal.Footer>
                            <a className="btn text-primary" onClick={addUser}>
                                <i className="fas fa-pencil-alt">Add New User</i>
                            </a>

                            <a className="btn text-primary" onClick={navigate}>
                                <i className="fas fa-pencil-alt">Cancel</i>
                            </a>
                        </Modal.Footer>
                    </Card.Body>
                </Modal.Body>
            </Card>
        </>
    )
}
