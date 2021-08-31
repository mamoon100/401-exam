import React from "react";
import axios from "axios";
import { Row, Card, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://crypto-explorer.herokuapp.com/crypto-list/")
      .then((item) => {
        // let tempData = item.data;
        // axios.get
        this.setState({
          data: item.data,
        });
      })
      .catch((err) => console.log("There was an Error"));
    if (this.props.auth0.isAuthenticated) {
      axios
        .post(
          `https://exam-401d28.herokuapp.com/user/${this.props.auth0.user.email}`
        )
        .then(() => console.log("Created"))
        .catch(() => console.log("Dubs"));
    }
  }

  addToFav = (index, item) => {
    let tempArray = this.state.data;
    const data = { fav: 7 };
    // @ts-ignore
    console.log(item);
    axios
      .put(
        `https://exam-401d28.herokuapp.com/user/${this.props.auth0.user.email}`,
        {
          fav: item,
        }
      )
      .then((res) => console.log(res))
      .catch(() => console.log("there was A problem"));
  };

  render() {
    return (
      <Row>
        {this.state.data.length > 0 &&
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
                          this.addToFav(index, item);
                        }}
                      >
                        Add to Fav
                      </Button>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    );
  }
}

export default withAuth0(Home);
