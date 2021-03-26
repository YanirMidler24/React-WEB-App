import React, { useState, useEffect, useContext } from 'react'
import { Badge, Button, Table } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"
import "bootstrap/js/src/collapse.js";
export default function Movies() {
    const { currentUser } = useAuth()
    const [flagDelete, setFlagDelete] = useState(false)
    const [flagUpdate, setFlagUpdate] = useState(false)
    const [flagCreate, setFlagCreate] = useState(false)
    const [flagSub, setFlagSub] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [clicksearchValue, setClicksearchValue] = useState("")

    const { movies, members, setCount, count, countSub, setCountSub } = useContext(CounterContext)
    const history = useHistory()




    useEffect(() => {

        if (sessionStorage["sub"].includes(true)) {
            setFlagSub(true)

        }
        else {
            setFlagSub(false)
        }

        if (sessionStorage["premissions"].includes("update movies")) {
            setFlagUpdate(false)

        } else {
            setFlagUpdate(true)
        }
        if (sessionStorage["premissions"].includes("delete movies")) {
            setFlagDelete(false)
        }
        else {
            setFlagDelete(true)

        }
        if (sessionStorage["premissions"].includes("create movies")) {
            setFlagCreate(false)
        }
        else {
            setFlagCreate(true)

        }

        if (sessionStorage["premissions"].includes("admin")) {
            setFlagUpdate(false)
            setFlagDelete(false)
            setFlagCreate(false)
        }


    }, [])



    const navigatEditMovies = (id) => {

        {
            sessionStorage["id"] = id
            let movieOfId = []
            movies.map(x => {
                if (x.id === id) {
                    movieOfId.push(x)
                }
            })
            sessionStorage["premissions"] = sessionStorage["premissions"]
            sessionStorage["movie"] = movieOfId
            history.push(`/editMovies/${sessionStorage["id"]}`)
        }




    }
    const deleteMOovie = async (id) => {

        const movieRef = db.collection('movies');
        const snapshot = await movieRef.get();
        let uid
        snapshot.forEach(doc => {
            if (doc.data().id === id) {
                uid = doc.id
            }
        })
        await db.collection('movies').doc(uid).delete()
        await movies.map((item, index) => {
            if (item.id === id) {

                return movies.pop(index)

            }
            return setCount(count + 1)
        })

    }
    const addMovies = () => {
        history.push("/addMovie")
    }




    const subscribe = async (title, id, date) => {
        const movieRef = db.collection("Members")
        const snapshot = await movieRef.get()
        let addToDB = true
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        snapshot.forEach(doc => {
            if (doc.data().id == sessionStorage["id"]) {
                let nameArr = [...doc.data().subscribe_movie_name]
                nameArr.forEach(x => {
                    if (x.title == title) {
                        addToDB = false
                        alert("movie already been subscribed")
                    }
                })
                if (addToDB) {
                    nameArr.push({ title: title, id: id, date: dateTime })
                    db.collection('Members').doc(doc.id).update(
                        {
                            subscribe_movie_name: nameArr
                        })


                }
            }

        })
        setCountSub(countSub + 1)
        console.log(countSub)

        await history.push("/Subscriptions")

    }


    const searchValueInMovies = () => {
        let value = searchValue
        setClicksearchValue(value)
    }
    return (

        <div  >
            <Dashboard />
            <div className="w-100 text-center mt-2">
                <Link to="/">Back to home page </Link>
                <br />
                <strong>current Email :</strong> {currentUser.email}
                <br />
            </div>
            <div >

                <Button variant="outline-dark" style={{ marginRight: "30px" }} type="submit" hidden={flagCreate} onClick={addMovies}>Add Movie</Button>
                <input type="text" placeholder="Search Movie..." aria-label="Search" onChange={(e) => setSearchValue(e.target.value)}></input>
                <input type="button" value="find" onClick={searchValueInMovies}></input>
            </div>
            <br />
            <Table striped bordered hover variant="hover"  >
                <thead width="20%">
                    <tr  >
                        <th style={{ backgroundColor: "silver" }}>Image</th>
                        <th style={{ backgroundColor: "silver" }}>The Movie's Title</th>
                        <th style={{ backgroundColor: "silver" }}>Premiered,genres</th>
                        <th style={{ backgroundColor: "silver" }}>member_that_subscribed_to_this_Movie</th>
                        <th style={{ backgroundColor: "silver" }}> User Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        movies &&
                        movies.map((item, index) => {
                            if (item.title.includes(clicksearchValue) || searchValue == null) {
                                return <>
                                    <tr >

                                        <td><img width="200" height="300"
                                            src={item.Image} alt="this is an movie poster"></img>
                                        </td>
                                        <td >{item.title}</td>
                                        <td>{item.Premiered} <br /> {item.Genres + ","}</td>
                                        <td>
                                            <ul>
                                                {members.map(y => {

                                                    return y.subscribe_movie_name.map(x => {
                                                        if (x.title == item.title) {
                                                            return <p><li><Link onClick={() => history.push("/Subscriptions")}>{y.name}</Link> , {x.date}</li></p>
                                                        }
                                                    })
                                                })}
                                            </ul>
                                        </td>
                                        <td>
                                            <Button variant="outline-primary" type="submit" hidden={flagUpdate} onClick={() => navigatEditMovies(item.id)} >Edit</Button>
                                            <br />
                                            <br />
                                            <br />
                                            <Button variant="outline-primary" hidden={flagDelete} onClick={() => deleteMOovie(item.id)} type="submit" >Delete</Button>
                                            <br />
                                            <br />
                                            <br />
                                            <Button variant="outline-primary" type="submit" hidden={flagSub} onClick={() => subscribe(item.title, item.id, item.Premiered)} >SUB</Button>
                                            <br />
                                            <br />
                                            <br />
                                            <Button variant="outline-primary" type="submit" hidden={flagSub} onClick={() => history.push("/Subscriptions")} >Back(Subscriptions)</Button>

                                        </td>
                                    </tr>


                                </>

                            }



                        })
                    }
                    <br />
                    <Link style={{ marginLeft: "300px" }} to="/">Back to home page </Link>
                </tbody>
            </Table>
        </div>
    )
}
