import React from "react";
import Row from "../Row/Row";
import Col from "../Col/Col";

function Card(props) {
    console.log(props.books)
    return (
        <div>
            {props.books.map(obj => {
                return (
                    <Row>
                        <Col size="12">
                            <div className="card text-center">
                                <div className="card-header">
                                    <h2>{obj.title}</h2>
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col size="4">
                                            <Row>
                                                <Col size="12">
                                                    <img src={obj.img}></img>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col size="12">
                                                    <h4>Author:</h4> {obj.author || "No Author Found"}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col size="5" >
                                                    <a><p>Save<i className="material-icons" id={obj._id} onClick={props.saveBook}>{props.icon}</i></p></a>
                                                </Col>
                                                <Col size="2">
                                                    <a href={obj.infoLink}><i className="material-icons">youtube_searched_for</i></a>
                                                </Col>
                                                <Col size="5">
                                                    <p>{obj.averageRating}<i className="material-icons">star</i></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col size="8">
                                            <p>{obj.description || "Looks like we don't have a description for this one! Click the link to check out more info on this volume"}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )
            })
            }
        </div>
    );
}

export default Card;
