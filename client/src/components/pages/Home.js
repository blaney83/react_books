import React, { Component } from "react";
import Container from "../Container/Container";
import Row from "../Row/Row";
import Col from "../Col/Col";
import Card from "../Card/Card";
import SearchForm from "../SearchForm/SearchForm";
import API from "../../utils/API";

class HomeContainer extends Component {
  state = {
    books: [],
    search: "",
    icon: "save"
  };

  // componentDidMount() {
  //   this.searchedBooks();
  // }

  searchedBooks = () => {
    API.allBook()
      .then(res => {
        console.log(res)  
        this.setState({ books: res.data })
      })
      .catch(err => console.log(err));
  };


  loadBooks = (bookSearch) => {
    API.createBooks(bookSearch)
      .then(res => {
        console.log(res)  
        this.setState({ books: res.data })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.loadBooks(this.state.search);
  };

  handleSave = event => {
    event.preventDefault();    
    API.getBook(event.target.id).then(res=>{
      if(res.status == 200){
        alert("Saved!")
      }
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="12">
            <div>
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="12">
            <h3>{this.state.search || "Search for a Book or Author to Begin"}</h3>
            <Card books={this.state.books} icon={this.state.icon} saveBook={this.handleSave}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeContainer;
