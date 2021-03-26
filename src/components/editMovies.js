import React, { useState, useEffect, useContext } from 'react'
import {  useHistory } from "react-router-dom"
import { db } from "../firebase"
import { Form, Card, Button, Modal } from "react-bootstrap"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"

export default function EditMoviesComp() {
    const [movie, setMovie] = useState([])
    const [title, setTitle] = useState("")
    const [Premiered, setPremiered] = useState("")
    const [Genres, setGenres] = useState([])
    const [Image, setImage] = useState("")
    const history = useHistory()
    const [uid, setUid] = useState("")
    const { movies, setCount, count } = useContext(CounterContext)


    useEffect(() => {
        if (sessionStorage["premissions"].includes("update movies") || sessionStorage["premissions"].includes("admin")) {
            console.log("ok")
        }
        else {
            history.push("/movies")

        }
    }, [])

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
    useEffect(async () => {
        const movieRef = db.collection("movies")
        const snapshot = await movieRef.get()
        snapshot.forEach(doc => {
            if (doc.data().id == sessionStorage["id"]) {
                setUid(doc.id)
            }
        })
    }, [])


    const editMovie = async () => {

        await db.collection('movies').doc(uid).update(
            {

                title: title,
                Genres: Genres,
                Premiered: Premiered,
                Image: Image


            })
        console.log("movie has been updated in DB")

        await setCount(count + 1)

        await history.push("/movies")

    }

    return (

        <div>
                <Dashboard/>
            {


                movie &&
                movie.map((item, index) => {
                    return <>
                        <Form style={{ maxWidth: "500px", marginLeft: "220px" }}>
                            <Card>
                                <Modal.Dialog>
                                    <Modal.Header>
                                        <Modal.Title>Movie Edit Page</Modal.Title>
                                    </Modal.Header>
                                </Modal.Dialog>
                                <Modal.Body>

                                    <Card.Body>
                                        <Form.Label>Movie Name</Form.Label>
                                        <Form.Group id="movieName">
                                            <Form.Control type="text" defaultValue={item.title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Label>Movie Premiered</Form.Label>
                                        <Form.Group id="Premiered">
                                            <Form.Control type="text" defaultValue={item.Premiered} onChange={(e) => setPremiered(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Label>Movie Genres</Form.Label>
                                        <Form.Group id="Genres">
                                            <Form.Control type="text" defaultValue={item.Genres} onChange={(e) => setGenres(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Label>Movie Poster</Form.Label>
                                        <Form.Group id="Poster">
                                            <Form.Control type="name" style={{ width: "200", height: "300" }} defaultValue={item.Image}
                                                onChange={(e) => setImage(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Modal.Footer>

                                            <Button onClick={editMovie} >Save</Button>
                                            <Button onClick={() => history.push("/movies")} >canel</Button>
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
