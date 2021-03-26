import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"
import { Form, Card, Button, Modal } from "react-bootstrap"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"



export default function AddMembers() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const history = useHistory()
    const [length, setLength] = useState(0)
    const { members, countSub, setCountSub} = useContext(CounterContext)

    useEffect(() => {
        if (sessionStorage["premissions"].includes("create subscriptions") || sessionStorage["premissions"].includes("admin")) {
            console.log("ok")
        }
        else {
            history.push("/Subscriptions")

        }
    }, [])
    useEffect(async () => {
        setLength(members.length + 1)
    }, [])

    const addMemberToDb = async () => {

        await db.collection('Members').add(
            {

                name: name,
                Email: email,
                City: city,
                id: length,
                subscribe_movie_name : []


            })
        console.log("movie has been updated in DB")

        await setCountSub(countSub + 1)
        await history.push("/Subscriptions")


    }

    return (

        <div>
            <Dashboard/>

            {



                <>

                    <Form style={{ maxWidth: "500px", marginLeft: "220px" }}>

                        <Card>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>Add New Member Page</Modal.Title>
                                </Modal.Header>
                            </Modal.Dialog>
                            <Modal.Body>

                                <Card.Body>
                                    <br />
                                    <br />
                                    <Form.Label>Member Name</Form.Label>
                                    <Form.Group id="memberName">
                                        <Form.Control placeholder="Enter Name..." type="text" onChange={(e) => setName(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Group id="Email">
                                        <Form.Control placeholder="Enter Email..." type="text" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Group id="City">
                                        <Form.Control placeholder="Enter City..." type="text" onChange={(e) => setCity(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Modal.Footer>

                                        <Button onClick={addMemberToDb} >Save</Button>
                                        <Button onClick={() => history.push("/Subscriptions")} >Canel</Button>

                                    </Modal.Footer>
                                </Card.Body>
                            </Modal.Body>

                        </Card>
                    </Form>

                </>

            }
        </div>
    )
}
