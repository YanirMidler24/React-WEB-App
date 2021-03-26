import React, { useState, useEffect, useContext } from 'react'
import { Button,  Table } from "react-bootstrap"
import { useHistory, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"

export default function Subscriptions() {
    const { members, movies, countSub, setCountSub } = useContext(CounterContext)
    const [addSub, setAddSub] = useState(true)
    const [editSub, setEditSub] = useState(true)
    const [delSub, setDelSub] = useState(true)
    const history = useHistory()
    const { currentUser } = useAuth()





    useEffect(() => {
        if (currentUser.email.includes("admin")) {

            setAddSub(false)
            setEditSub(false)
            setDelSub(false)
        }

        //Movies list
        if (sessionStorage["premissions"].includes("delete subscriptions")) {
            setDelSub(false)
        }

        //view Subscription
        if (sessionStorage["premissions"].includes("update subscriptions")) {
            setEditSub(false)
        }
        if (sessionStorage["premissions"].includes("create subscriptions")) {
            setAddSub(false)
        }

    }, [])

    const editMember = (id) => {
        sessionStorage["id"] = id
        history.push(`/EditMember/${id}`)
    }

    const deleteMember = async (id) => {
        const memRef = db.collection("Members")
        const snapshot = await memRef.get()
        let uid
        snapshot.forEach(doc => {
            if (doc.data().id === id) {
                uid = doc.id
            }
        })
        await db.collection('Members').doc(uid).delete()
        await members.map((item, index) => {
            if (item.id === id) {

                return members.pop(index)

            }
            return setCountSub(countSub + 1)
        })
    }
    const navigate = (id) => {
        sessionStorage["sub"] = false

        sessionStorage["id"] = id
        history.push("/movies")
    }

    const moviePage = (id) => {


        sessionStorage["id"] = id
        let movieOfId = []
        movies.map(x => {
            if (x.id === id) {
                movieOfId.push(x)
            }
            return x
        })
        sessionStorage["premissions"] = sessionStorage["premissions"]
        sessionStorage["movie"] = movieOfId
        history.push(`/viewSubMovie/${sessionStorage["id"]}`)
    }
    return (
        <>
        <Dashboard/>
            <div className="w-100 text-center mt-2" >
                <strong className="text-center mb-4"  >Current Email </strong>{currentUser.email}
                <br />
                <br />
                <h2 className="text-center mb-4"   >Subscriptions List</h2>
                <Button variant="outline-dark" style={{ marginRight: "120px" }} type="submit" hidden={addSub} style={{ marginLeft: "10px" }} onClick={() => history.push("/addmember")}>Add Members</Button>
                <Button variant="outline-dark" style={{ marginLeft: "880px" }} onClick={() => history.push("/")}>Back To Main</Button>
                <br />
                <br />

                <Table striped bordered hover variant="dark" >
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>movies that member had subscribed</th>
                            <th>User Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            members.map(x => {
                                return <>



                                    <tr>
                                        <td>{x.name}</td>
                                        <td>{x.Email}</td>
                                        <td>{x.City}</td>

                                        <tb>
                                            {x.subscribe_movie_name.map(x => {
                                                return <p className="font-weight-bold"><Link onClick={() => moviePage(x.id)}>{x.title}</Link> ,{x.date} </p>

                                            })}
                                            <a className="btn text-primary" onClick={() => navigate(x.id)}>
                                                <i class="fa fa-pencil" aria-hidden="true">Movies List To Watch And Subscribe</i>
                                            </a>
                                        </tb>
                                        <td>


                                            <a className="btn text-primary" hidden={editSub} onClick={() => editMember(x.id)}>
                                                <i class="fa fa-pencil" aria-hidden="true">Edit</i>
                                            </a>

                                            <a className="btn text-primary" hidden={delSub} onClick={() => deleteMember(x.id)}>
                                                <i class="fa fa-pencil" aria-hidden="true">Delete</i>
                                            </a>
                                        </td>

                                    </tr>




                                </>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}
