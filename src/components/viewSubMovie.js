import React, { useState, useEffect, useContext } from 'react'
import { Badge, Button, Table } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { CounterContext } from '../contexts/ContextData'


export default function ViewSubMovie() {
    const [movie, setMovie] = useState([])
    const [title, setTitle] = useState("")
    const [Premiered, setPremiered] = useState("")
    const [Genres, setGenres] = useState([])
    const [Image, setImage] = useState("")
    const history = useHistory()
    const [uid, setUid] = useState("")
    const { movies, setCount, count } = useContext(CounterContext)
    const { currentUser } = useAuth()


    useEffect(() => {

        let arr = []
        movies.forEach(doc => {
            if (doc.id == sessionStorage["id"]) {
                arr.push(doc)
                setMovie(arr)
                setTitle(doc.title)
                setPremiered(doc.Premiered)
                setGenres(doc.Genres)
                setImage(doc.Image)
            }
        })
        console.log("movie has been updated in state")


    }, [])

    return (


        <div >

            <div className="w-100 text-center mt-2">
                <Link to="/">Back to home page </Link>
                <br />
                <strong>current Email LogIn:</strong> {currentUser.email}
                <br />
            </div>
            <Table variant="hover"  >
                <thead width="20%">
                    <tr >
                        <th style={{ backgroundColor: "silver" }}>Image</th>
                        <th style={{ backgroundColor: "silver" }}>The__Movie__Name</th>
                        <th style={{ backgroundColor: "silver" }}>Premiered,genres</th>
                        <th style={{ backgroundColor: "silver" }}> User Actions</th>
                    </tr>
                </thead>
                {

                    movie &&
                    movie.map((item, index) => {
                        return <>
                                    <tr >
                                        
                                        <td><img width="200" height="300"
                                            src={item.Image} alt="this is an movie poster"></img>
                                        </td>
                                        <td >{item.title}</td>
                                        <td>{item.Premiered} <br/> {item.Genres + ","}</td>
                                        <td> <Button type="submit" onClick={() => history.push("/Subscriptions")} >Back(Subscriptions)</Button></td>

                            </tr>
                            </>

                    })
                }
                <br />
            </Table>
        </div>
    )
}
