import React from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

class FavCrypto extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      item: "",
      show: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://exam-401d28.herokuapp.com/user/${this.props.auth0.user.email}`
      )
      .then((response) => {
        // console.log(response.data[0].fav);
        this.setState({
          data: response.data[0].fav,
        });
      });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          {this.state.data.length > 0 ? (
            this.state.data.map((item, index) => {
              return (
                <Col lg={4} className="mb-2">
                  <Card key={item.id}>
                    <Card.Img variant="top" src={item.image_url} width="100%" />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Footer>
                        <p>{item.toUSD}</p>
                        <Button
                          id={item.id}
                          variant="primary"
                          onClick={() => {
                            // this.addToFav(index, item);
                          }}
                        >
                          Remove From Fav
                        </Button>
                        <Button
                          id={item.id}
                          variant="primary"
                          onClick={() => {
                            this.setState({
                              show: true,
                              item: item,
                            });
                          }}
                        >
                          Update
                        </Button>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <h1>Add Somthing To Your Fav</h1>
          )}
        </Row>
      </>
    );
  }
}

export default withAuth0(FavCrypto);
