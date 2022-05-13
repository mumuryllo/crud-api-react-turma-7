import React, { useState } from 'react'
import { AiFillCheckCircle } from "react-icons/ai";
import {
    Container, ListGroup, Row,
    Col, Button, Modal,
    Alert, Form
} from 'react-bootstrap'

function CustomerList(props) {

    const Customers = props.Customers || []

    const [costumer, setCustomer] = useState({});
    const [show, setShow] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderCustomer = () => {
        return Customers.map((user) => {
            return (
                <ListGroup className="userCustomer">
                    <ListGroup.Item>
                        <Row className="userTitle">
                            <Col md={2}>
                                NOME:
                            </Col >
                            <Col md={2}>
                                IDADE:
                            </Col>
                            <Col md={2}>
                                CPF:
                            </Col>
                            <Col md={2}>
                                TELEFONE:
                            </Col>
                            <Col md={1}>
                                ESTADO:
                            </Col>
                            <Col md={3} >
                                AÇÕES
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item key={user.id}>

                        <Row >
                            <Col md={2}>
                                {user.name}
                            </Col >
                            <Col md={2}>
                                {user.age}
                            </Col>
                            <Col md={2}>
                                {user.document}
                            </Col>

                            <Col md={2}>
                                {user.tel}
                            </Col>

                            <Col md={1}>
                                {user.state}
                            </Col>
                            <Col md={3} >
                                <Button className="mx-3" variant="secondary"
                                    onClick={() => {
                                        setCustomer(user)
                                        handleShowEdit()
                                    }}>
                                    Editar
                                </Button>
                                <Button className="mx-3" variant="danger"
                                    onClick={() => {
                                        setCustomer(user)
                                        handleShow()
                                    }}>
                                    Deletar
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>

            )
        })
    }

    return (
        <Container>

            {
                successDelete
                    ?
                    <Alert key='success' variant='success'>
                        <AiFillCheckCircle size="30" /> Item apagado com suceso
                    </Alert>
                    :
                    ''
            }

            <Row>
                <Col>
                    <ListGroup variant="flush">
                        {renderCustomer()}
                    </ListGroup>
                </Col>
            </Row>

            {/* //modal delete */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Apagar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja apagar Usuário: <strong>{costumer.name}?</strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => {
                        props.delete(costumer.id)
                        handleClose()
                        setSuccessDelete(true)
                        setTimeout(
                            () => {
                                setSuccessDelete(false)
                            }, 3000)
                    }}>
                        Apagar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* //modal edit */}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>NOME:</Form.Label>
                        <Form.Control type="text" placeholder="Editar nome"
                            value={costumer.name}
                            onChange={event => setCustomer({ ...costumer, name: event.target.value })} />
                        <Form.Label>IDADE:</Form.Label>
                        <Form.Control type="text" placeholder="Editar idade"
                            value={costumer.age}
                            onChange={event => setCustomer({ ...costumer, age: event.target.value })} />
                        <Form.Label>CPF:</Form.Label>
                        <Form.Control type="text" placeholder="Editar CPF"
                            value={costumer.document}
                            onChange={event => setCustomer({ ...costumer, document: event.target.value })} />
                        <Form.Label>TELEFONE:</Form.Label>
                        <Form.Control type="text" placeholder="Editar telefone"
                            value={costumer.tel}
                            onChange={event => setCustomer({ ...costumer, tel: event.target.value })} />
                        <Form.Label>ESTADO:</Form.Label>
                        <Form.Control type="text" placeholder="Editar estado"
                            value={costumer.state}
                            onChange={event => setCustomer({ ...costumer, state: event.target.value })} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => {
                        props.editDescription(costumer)
                        handleCloseEdit()
                    }
                    }>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default CustomerList