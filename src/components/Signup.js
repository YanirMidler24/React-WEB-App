import { db } from "../firebase"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert ,Modal} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        const data = []
        snapshot.forEach(doc => {
            data.push(doc.data().email);
        })
        if (!data.includes(email)) {
            console.log(email)
            setError("Failed to create an account")
        }
        else if (data.includes(email)) {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")
        }

        setLoading(false)
    }

    return (
        <>
            <Card style={{ maxWidth: "500px", marginLeft: "220px" }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                </Modal.Dialog>
                <Modal.Body>

                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Modal.Footer>

                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                         </Button>
                         </Modal.Footer>

                    </Form>

                </Card.Body>
                </Modal.Body>

            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}