import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"
import { Form, Card, Button, Modal } from "react-bootstrap"
import Dashboard from "./Dashboard"

import { CounterContext } from '../contexts/ContextData'
export default function EditMember() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [member, setMember] = useState([])
    const [uid, setUid] = useState("")

    const history = useHistory()
    const { members, countSub, setCountSub } = useContext(CounterContext)


    useEffect(() => {
        if (sessionStorage["premissions"].includes("update subscriptions") || sessionStorage["premissions"].includes("admin")) {
            console.log("ok")
        }
        else {
            history.push("/Subscriptions")

        }
    }, [])

    useEffect(() => {

        let arr = []
        members.forEach(doc => {
            if (doc.id == sessionStorage["id"]) {
                arr.push(doc)
                setMember(arr)
                setName(doc.name)
                setEmail(doc.Email)
                setCity(doc.City)

            }
        })
        console.log("movie has been updated in state")


    }, [])
    useEffect(async () => {
        const movieRef = db.collection("Members")
        const snapshot = await movieRef.get()
        snapshot.forEach(doc => {
            if (doc.data().id == sessionStorage["id"]) {
                setUid(doc.id)
            }
        })
    }, [])

    const editMember = async () => {
        await db.collection('Members').doc(uid).update(
            {

                name: name,
                Email: email,
                City: city,


            })
        console.log("movie has been updated in DB")

        await setCountSub(countSub + 1)

        await history.push("/Subscriptions")

    }


    return (
        <div>
            <Dashboard />
            {


                member &&
                member.map((item, index) => {
                    return <>
                        <Form style={{ maxWidth: "500px", marginLeft: "220px" }}>
                            <Card>
                                <Modal.Dialog>
                                    <Modal.Header>
                                        <Modal.Title>Subscriptions Edit Page</Modal.Title>
                                    </Modal.Header>
                                </Modal.Dialog>
                                <Modal.Body>

                                    <Card.Body>
                                        <Form.Label>member Name</Form.Label>
                                        <Form.Group id="membername">
                                            <Form.Control type="text" defaultValue={item.name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Label>Member Email</Form.Label>
                                        <Form.Group id="Email">
                                            <Form.Control type="text" defaultValue={item.Email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Label>Member City</Form.Label>
                                        <Form.Group id="City">
                                            <Form.Control type="text" defaultValue={item.City} onChange={(e) => setCity(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Modal.Footer>
                                            <Button onClick={editMember} >Save</Button>
                                            <Button onClick={() => history.push("/Subscriptions")} >Canel</Button>

                                        </Modal.Footer>
                                    </Card.Body>
                                </Modal.Body>

                            </Card>
                        </Form>
                    </>
                })
            }

        </div>
    )
}
