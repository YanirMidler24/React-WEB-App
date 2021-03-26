import React, { useState, useEffect, useContext } from 'react'
import { Badge, Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"

export default function Movie() {
    const { currentUser } = useAuth()
    const [flagDelete, setFlagDelete] = useState(false)
    const [flagUpdate, setFlagUpdate] = useState(false)
    const [flagCreate, setFlagCreate] = useState(false)
    const [flagSub, setFlagSub] = useState(false)

    const { movies, setCount, count, countSub, setCountSub } = useContext(CounterContext)
    const history = useHistory()




    useEffect(() => {
        if (sessionStorage["sub"].includes(true)) {
            setFlagSub(true)

        }
        else if (sessionStorage["sub"].includes(false)) {
            setFlagSub(false)
        }

        if (sessionStorage["premissions"].includes("update movies") || sessionStorage["premissions"].includes("admin")) {
            setFlagUpdate(false)

        } else if (!sessionStorage["premissions"].includes("update movies") || !sessionStorage["premissions"].includes("admin")) {
            setFlagUpdate(true)
        }
        if (sessionStorage["premissions"].includes("delete movies") || sessionStorage["premissions"].includes("admin")) {
            setFlagDelete(false)
        }
        else if (!sessionStorage["premissions"].includes("delete movies") || !sessionStorage["premissions"].includes("admin")) {
            setFlagDelete(true)

        }
        if (sessionStorage["premissions"].includes("create movies") || sessionStorage["premissions"].includes("admin")) {
            setFlagCreate(false)
        }
        else if (!sessionStorage["premissions"].includes("delete movies") || !sessionStorage["premissions"].includes("admin")) {
            setFlagCreate(true)

        }



    }, [])



    const navigatEditMovies = (id) => {

        {
            sessionStorage["id"] = id
            let movieOfId = []
            movies.map(x => {
                if (x.id == id) {
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
            if (doc.data().id == id) {
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
        snapshot.forEach(doc => {
            if (doc.data().id == sessionStorage["id"]) {
                let nameArr = [...doc.data().subscribe_movie_name]
                nameArr.forEach(x => {
                    if (x.title == title) {
                        addToDB = false
                    }
                })
                if (addToDB) {
                    nameArr.push({ title: title, id: id, date: date })
                    db.collection('Members').doc(doc.id).update(
                        {
                            subscribe_movie_name: nameArr
                        })
                    setCountSub(countSub + 1)
                }

            }

        })


        history.push("/Subscriptions")
    }

    return (

        <div>
            <Dashboard/>
            <div className="w-100 text-center mt-2">
                <Link to="/">Back to home page </Link>
                <br />
                <strong>current Email LogIn:</strong> {currentUser.email}
                <br />
            </div>
            <Button type="submit" hidden={flagCreate} onClick={addMovies}>Add Movie</Button>
            
            {

                movies &&
                movies.map((item, index) => {
                    return <div style={{ border: "2px solid black" }}>

                        <h5 key={index} >
                            <Badge variant="secondary">the movie name: {item.title}, {item.Premiered}</Badge>
                        </h5>
                        <h6 > genres: {item.Genres}</h6>
                        <img width="200" height="300"
                            src={item.Image} alt="this is an movie poster"></img>

                        <br />
                        <Button type="submit" hidden={flagUpdate} style={{marginLeft : "10px"}} onClick={() => navigatEditMovies(item.id)} >Edit</Button>
                        <Button type="submit" hidden={flagSub} style={{marginLeft : "10px"}} onClick={() => subscribe(item.title, item.id, item.Premiered)} >SUB</Button>


                        <Button style={{ marginLeft: "10px" }} style={{marginLeft : "10px"}} hidden={flagDelete} onClick={() => deleteMOovie(item.id)} type="submit" >Delete</Button>
                        <Button type="submit" hidden={flagSub} style={{marginLeft : "10px"}} onClick={() => history.push("/Subscriptions")} >Back(Subscriptions)</Button>

                    </div>

                })
            }
            <br />
            <Link to="/">Back to home page </Link>

        </div>
    )
}
