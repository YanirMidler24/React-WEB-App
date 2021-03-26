import React, {  useEffect ,useContext} from 'react'
import { db } from "../firebase"
import { Link, useHistory } from "react-router-dom"
import { Table } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"

export default function Users() {

    const { currentUser } = useAuth()
    const {users,countUser,setCountUser } = useContext(CounterContext)
    const history = useHistory()

    useEffect(() => {
        if (!currentUser.email.includes("admin")) {
            history.push("/")
        }
    }, [])







    const editUser = (id, doc) => {
        sessionStorage["uid"] = doc
        sessionStorage["id"] = id
        history.push(`/edit-user/${doc}/${id}`)
    }

    const delUser = async (doc) => {
        await db.collection('users').doc(doc).delete()
        await users.map((item, index) => {
            if (item.doc === doc) {
                return users.pop(index)
            }
            return users

        })
        await setCountUser(countUser+1)

        history.push("/users")
    }

    return (
        <div >
            <Dashboard/>

            <div className="container">
                <h1 className="display-4 text-center" >Users Lists</h1>
            </div>
            <br />
            <Link style={{ marginLeft: "410px" }} to="/Usermgmt">Back to Users Managemt </Link>
            <br />
            <br />



            <Table striped bordered hover variant="dark" >
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Created time</th>
                        <th>session time (min)</th>
                        <th>premissions</th>
                        <th>User Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(item => {

                            return <>

                                <tr>
                                    <td>{item.Full_Name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.Created_time}</td>
                                    <td>{item.session_time_in_min}</td>
                                    <td>
                                        {item.premissions.map(x => {


                                            return <li>{x}</li>

                                        })}
                                    </td>
                                    <tb>
                                        <a className="btn text-primary" onClick={() => editUser(item.id, item.doc)}>
                                            <i class="fa fa-pencil" aria-hidden="true">edit</i>
                                        </a>

                                        <a className="btn text-primary" onClick={() => delUser(item.doc)}>
                                            <i class="fa fa-pencil" aria-hidden="true">Delete</i>
                                        </a>

                                    </tb>
                               
                                </tr>
                          
                                </>
                          })
                          
                        }
                            </tbody>


            </Table>

        </div>
    )
}
