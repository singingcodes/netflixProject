import React, { Component } from "react"
import {
  Carousel,
  Row,
  Col,
  FormControl,
  Spinner,
  Alert,
} from "react-bootstrap"

class LordRings extends Component {
  state = {
    movies: [],
    isLoading: true,
    searchQuery: "",
    isError: false,
  }
  componentDidMount = async () => {
    try {
      const response = await fetch(
        "http://www.omdbapi.com/?apikey=b9ab1ae9&s=Lord+of+the+Rings"
      )
      if (response.ok) {
        let data = await response.json()
        let dataArray = data.Search
        console.log(dataArray)
        this.setState({
          movies: dataArray,
          isLoading: false,
        })
      } else {
        this.setState({
          isError: true,
        })
        console.log("an error ocurred")
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <h5>Lord Of The Rings</h5>
        {this.state.isError && (
          <Alert variant="danger">Error please try again</Alert>
        )}
        {this.state.isLoading && <Spinner animation="border" variant="info" />}
        <Col md={3} className="mb-2">
          <FormControl
            type="text"
            placeholder="Search Lord of the rings..."
            value={this.state.searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
        </Col>
        <Carousel className="carousel slide mb-4 d-none d-md-block">
          <Carousel.Item>
            <Row className="mx-n1">
              {this.state.movies
                .filter((movie) =>
                  movie.Title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((movie) => (
                  <Col className="sm-6 md-4 xl-2 px-1" key={movie.imdbID}>
                    <img
                      className="d-block w-100"
                      src={movie.Poster}
                      alt="Third slide"
                    />
                  </Col>
                ))}
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="mx-n1">
              {this.state.movies.map((movie) => (
                <Col className="sm-6 md-4 xl-2 px-1" key={movie.imdbID}>
                  <img
                    className="d-block w-100"
                    src={movie.Poster}
                    alt="Third slide"
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}
export default LordRings
