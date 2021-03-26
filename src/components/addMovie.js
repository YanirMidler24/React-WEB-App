import React, { useState, useEffect, useContext } from 'react'
import {  useHistory } from "react-router-dom"
import { db } from "../firebase"
import { Form, Card, Button, Modal } from "react-bootstrap"
import { CounterContext } from '../contexts/ContextData'
import Dashboard from "./Dashboard"

export default function AddMovie() {
    const [title, setTitle] = useState("")
    const [Premiered, setPremiered] = useState("")
    const [Genres, setGenres] = useState([])
    const [Image, setImage] = useState("")
    const history = useHistory()
    const [length, setLength] = useState(0)
    const { movies, setCount, count } = useContext(CounterContext)


    useEffect(() => {
        if (sessionStorage["premissions"].includes("create movies") || sessionStorage["premissions"].includes("admin")) {
            console.log("ok")
        }
        else {
            history.push("/movies")

        }
    }, [])

    useEffect(async () => {
        setLength(movies.length + 10)
    }, [])






    const addMovieToDb = async () => {

        await db.collection('movies').add(
            {

                title: title,
                Genres: Genres,
                Premiered: Premiered,
                Image: Image,
                id: length + 1


            })
        console.log("movie has been updated in DB")

        setCount(count + 1)
        await history.push("/movies")




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
                                    <Modal.Title>Add New Movie Page</Modal.Title>
                                </Modal.Header>
                            </Modal.Dialog>
                            <Modal.Body>

                                <Card.Body>
                                    <Form.Label>Movie Name</Form.Label>
                                    <Form.Group id="movieName">
                                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Label>Movie Premiered</Form.Label>
                                    <Form.Group id="Premiered">
                                        <Form.Control type="text" onChange={(e) => setPremiered(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Label>Movie Genres</Form.Label>
                                    <Form.Group id="Genres">
                                        <Form.Control type="text" onChange={(e) => setGenres(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Label>Movie Poster</Form.Label>
                                    <Form.Group id="Poster">
                                        <Form.Control type="name" style={{ width: "200", height: "300" }}
                                            onChange={(e) => setImage(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button style={{ marginLeft: "170px" }} type="submit" onClick={() => history.push("/movies")}>Canel</Button>
                                        <Button onClick={addMovieToDb} >Save</Button>

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
