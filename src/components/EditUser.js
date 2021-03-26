import React, { useEffect, useState, useContext } from 'react'
import {  useHistory } from "react-router-dom"
import { db } from "../firebase"
import { Form, Card, Button, Modal } from "react-bootstrap"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"

export default function EditUser() {
    const [data, setData] = useState([])
    const [premissions, setPremissions] = useState([])
    const [dataPrem, setDataPrem] = useState([])
    const [email, setEmail] = useState("")
    const [fname, setFname] = useState("")
    const [viewSubAuto, setViewSubAuto] = useState(0)
    const [viewMovAuto, setViewMovAuto] = useState(0)
    const [checked, setChecked] = useState(false)
    const [session, setSession] = useState("40")
    const history = useHistory()
    const { premissionsList, users, countUser, setCountUser } = useContext(CounterContext)




    useEffect(async () => {


        const data = []
        users.forEach(doc => {
            if (doc.doc == sessionStorage["uid"]) {
                setFname(doc.Full_Name)
                setEmail(doc.email)
                setChecked(doc.Manager)
                setDataPrem(doc.premissions)
                setPremissions(doc.premissions)
                setSession(doc.session_time_in_min)

                data.push(doc);
            }


        })
        setData(data)

    }, [])

    const navigate = () => {
        history.push("/users")
    }
    async function handleSubmit(e) {
        e.preventDefault()

        await db.collection('users').doc(sessionStorage["uid"]).update({
            email: email, Full_Name: fname,
            session_time_in_min: session,
            Manager: checked,
            premissions: premissions
        })
        setCountUser(countUser + 1)
        await history.push("/users")


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
    ////////////
    let subFlag
    if (viewSubAuto === 3) {
        subFlag = true
        let arr = [...premissions]
        arr.push("view subscriptions")
    }

    else {
        subFlag = null
        let arr = [...premissions]
        arr.pop("view subscriptions")
    }


    let movieFlag
    if (viewMovAuto === 3) {
        movieFlag = true
    }
    else {
        movieFlag = null
    }
    ///////////////

    let viewFlag
    if (dataPrem.includes("view movies")) {
        viewFlag = true

    }
    let delFlag
    if (dataPrem.includes("delete movies")) {

        delFlag = true
    }
    let createFlag
    if (dataPrem.includes("create movies")) {

        createFlag = true
    }
    let updateFlag
    if (dataPrem.includes("update movies")) {
        updateFlag = true
    }
    let viewSubFlag
    if (dataPrem.includes("view subscriptions")) {
        viewSubFlag = true
    }
    let delSubFlag
    if (dataPrem.includes("delete subscriptions")) {
        delSubFlag = true
    }
    let updateSubFlag
    if (dataPrem.includes("update subscriptions")) {
        updateSubFlag = true
    }
    let createSubFlag
    if (dataPrem.includes("create subscriptions")) {
        createSubFlag = true
    }



    return (
        <>
        <Dashboard/>
            {
                data.map(item => {
                    return <>
                   

                        <Form style={{ maxWidth: "500px", marginLeft: "220px" }} onSubmit={handleSubmit}>
                            <Card>
                                <Card.Body>
                                    <Modal.Dialog>
                                        <Modal.Header>
                                            <Modal.Title>User Edit  :  {item.Full_Name}</Modal.Title>
                                        </Modal.Header>
                                    </Modal.Dialog>
                                    <Modal.Body>
                                        <Form.Group id="fname">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="name" defaultValue={item.Full_Name} onChange={(e) => setFname(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group id="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" defaultValue={item.email} onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group id="session_time_in_min">
                                            <Form.Label>session time Out (in min)</Form.Label>
                                            <Form.Control defaultValue={item.session_time_in_min} onChange={(e) => setSession(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group id="timeCreated">
                                            <Form.Label>Created Time</Form.Label>
                                            <Form.Control value={item.Created_time} />
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Check label="Manager?" defaultChecked={item.Manager} type="checkbox" onChange={(e) => addMgmt(e.target.checked)} ></Form.Check>
                                        </Form.Group>
                                        {
                                            premissionsList.map((x, index) => {
                                                return <Form.Group key={index} >

                                                    <Form.Check label={x.view_movies} defaultChecked={viewFlag} checked={movieFlag} onChange={(e) => view_movies(e.target.checked)} />
                                                    <Form.Check label={x.update_movies} defaultChecked={updateFlag} onChange={(e) => update_movies(e.target.checked)} />
                                                    <Form.Check label={x.delete_movies} defaultChecked={delFlag} onChange={(e) => delete_movies(e.target.checked)} />
                                                    <Form.Check label={x.create_movies} defaultChecked={createFlag} onChange={(e) => create_movies(e.target.checked)} />
                                                    <Form.Check label={x.view_subs} defaultChecked={viewSubFlag} checked={subFlag} onChange={(e) => view_subs(e.target.checked)} />
                                                    <Form.Check label={x.update_subs} defaultChecked={updateSubFlag} onChange={(e) => update_subs(e.target.checked)} />
                                                    <Form.Check label={x.delete_subs} defaultChecked={delSubFlag} onChange={(e) => delete_subs(e.target.checked)} />
                                                    <Form.Check label={x.create_subs} defaultChecked={createSubFlag} onChange={(e) => create_subs(e.target.checked)} />
                                                </Form.Group >
                                            })
                                        }
                                        <Modal.Footer>

                                            <Button  type="submit">Update User info</Button>
                                            <Button style={{ marginLeft: "10px" }} type="submit" onClick={navigate}>Cancel</Button>

                                        </Modal.Footer>
                                    </Modal.Body>
                                </Card.Body>

                            </Card>
                        </Form>



                    </>
                })
            }


        </>
    )
}
