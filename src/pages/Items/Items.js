import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import { getRequest, postRequest } from "../../services/ApiService";

const Items = () => {
    const [items, setItems] = useState(null);

    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        const getAllItems = async () => {
            const response = await getRequest("/items");
            setItems(response.data);
        }

        getAllItems();

    }, []);

    const addItem = async (event) => {
        event.preventDefault();

        const data = {
            "name": itemName,
            "qty": qty,
            "price": price,
        }

        const response = await postRequest("/items",data);

        if(response && response.status === 201) {
            setItems([...items,response.data]);
            setItemName("");
            setQty(0);
            setPrice(0);
            handleClose();
        } else {
            //show error
        }
    }

    return (
        <>
            <Container>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Available Qty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map(item => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>
                                        <Button variant="secondary" size="sm">Edit</Button>&nbsp;
                                        <Button variant="danger" size="sm">Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div className="text-end">
                    <Button variant="primary" onClick={handleShow}>Add Item</Button>
                </div>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addItem}>
                        <FloatingLabel id="itemName" label="Name of the Item" className="mb-3">
                            <Form.Control placeholder="Name of the Item" value={itemName} onChange={(event) => {
                                setItemName(event.target.value)
                            }} />
                        </FloatingLabel>

                        <FloatingLabel id="itemPrice" label="Price" className="mb-3">
                            <Form.Control placeholder="Price" value={price} onChange={(event) => {
                                setPrice(event.target.value);
                            }} />
                        </FloatingLabel>

                        <FloatingLabel id="itemQty" label="Stock Qty" className="mb-3">
                            <Form.Control type="number" placeholder="Stock Qty" value={qty} onChange={(event) => {
                                setQty(event.target.value);
                            }}/>
                        </FloatingLabel>

                        <Button type="submit" variant="primary">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Items;