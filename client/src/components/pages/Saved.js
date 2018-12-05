import React, { Component } from "react";
import Container from "../Container/Container";
import Row from "../Row/Row";
import Col from "../Col/Col";
import Card from "../Card/Card";
import API from "../../utils/API";

class Saved extends Component {

    state = {
        books: [],
        search: "",
        icon: "delete"
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getSaved()
            .then(res => {
                console.log(res.data)
                this.setState({ books: res.data })
            })
            .catch(err => console.log(err));
    };

    handleClearSaved= () => {
        API.deleteSaved("33")
            .then(res=>{
                this.setState({ books: []})
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Row>
                        <Col size="12">
                            <Card books={this.state.books} icon={this.state.icon} saveBook={this.handleSave} />
                        </Col>
                    </Row>
                </Row>
                <button onClick={this.handleClearSaved}>DELETE ALL</button>
            </Container>
        )
    }
}

export default Saved;