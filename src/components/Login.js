import React, { useRef, useState,useContext } from "react"
import { Form, Button, Card, Alert, Modal } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { CounterContext } from '../contexts/ContextData'

export default function Login() {
  const { users } = useContext(CounterContext)

  const emailRef = useRef()
  const passwordRef = useRef()
  const {currentUser, login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      sessionStorage["users"] = JSON.stringify(users)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card style={{ maxWidth: "500px", marginLeft: "220px" }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
        </Modal.Dialog>
        <Modal.Body>

        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Modal.Footer>

            <Button disabled={loading} className="w-100" type="submit">
              LogIn
            </Button>
            </Modal.Footer>

          </Form>

        </Card.Body>
        </Modal.Body>

      </Card>
      <div className="w-100 text-center mt-2">
        New User ? <Link to="/signup">create Account</Link>
      </div>
    </>
  )
}