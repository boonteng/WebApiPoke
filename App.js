//https://client2-boon.herokuapp.com/

import React, { Component } from 'react';
import './App.css';
import CollectionCard from './CollectionCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import Carousal_Header from './Carousal_Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      successAlert: false,
      deleteAlert: false,
      name: '',
      collection_id: '',
      collections: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
    this.setState({ successAlert: false });
    this.setState({ deleteAlert: false });
  }

  getAllCollections = () => {
    axios
      .get('https://server2-boon.herokuapp.com/collectionGetAll')
      .then(result => {
        this.setState({ collections: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCollections();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://server2-boon.herokuapp.com/collectionAdd?name=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        } else {
          this.setState({ successAlert: true });
          setTimeout(() => {
            this.setState({ successAlert: false });
          }, 2000);
        }

        this.getAllCollections();
      })
      .catch(error => {
        // alert('Error: ', error);
        this.setState({ alertVisible: true });
        setTimeout(() => {
          this.setState({ alertVisible: false });
        }, 2000);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeCollection(collection_id) {
    this.setState({
      collections: this.state.collections.filter(collection => {
        if (collection.collection_id !== collection_id) return collection;
      })
    });
    const query = `https://server2-boon.herokuapp.com/collectionDelete?collection_id=${collection_id}`;

    axios
      .get(query)
      .then(result => {
        this.setState({ deleteAlert: true });
        setTimeout(() => {
          this.setState({ deleteAlert: false });
        }, 2000);

        this.getAllCollections();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let collectionCards = this.state.collections.map(collection => {
      return (
        <Col sm="12" key={collection.collection_id}>
          <CollectionCard
            removeCollection={this.removeCollection.bind(this)}
            collection={collection}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <Carousal_Header />
          <Row>
            <Col>
              <Alert
                color="warning"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Pokemon not found
              </Alert>

              <Alert
                color="success"
                isOpen={this.state.successAlert}
                toggle={this.onDismiss}
              >
                New Pokemon Added
              </Alert>

              <Alert
                color="danger"
                isOpen={this.state.deleteAlert}
                toggle={this.onDismiss}
              >
                Pokemon Deleted
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter pokemon name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button outline color="info">Add</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{collectionCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
