//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

export class CollectionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let {
      collection_id,
      name,
     nationalPokedexNumber,
     imageUrl,
     Url,
    } = this.props.collection;
    return (
      <div>
        <Table
          striped
          bordered
          size="sm"
          style={{ backgroundColor: '#F5F5DC' }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Collection Profile</th>
              <th>nationalPokedexNumber</th>
              <th>imageUrl</th>
              <th>Url</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '20px' }}>1</td>
              <td style={{ width: '200px' }}>
                <Card style={{ width: '200px', height: '90%' }}>
                 
                  <CardBody>
                    <CardTitle style={{ color: 'black' }}>Cubone</CardTitle>


                    

                    <Modal
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={this.toggle}>
                        <span style={{ color: 'orange' }}>Cubone</span> nationalPokedexNumber
                      </ModalHeader>
                      <ModalBody>
                        <div class="row">
                         

                          <Col sm="6">
                            <ListGroup style={{ marginLeft: '10px' }}>
                            <ListGroupItem>
                                <b>nationalPokedexNumber</b>
                              </ListGroupItem>
                              <ListGroupItem
                                style={{
                                  fontSize: '12px',
                                  textAlign: 'left',
                                  height: '125px'
                                }}
                              >
                                104
                              </ListGroupItem>

                              

                            </ListGroup>
                          </Col>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                          Back
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </CardBody>
                </Card>
              </td>
              <td style={{ width: '180px' }}>{nationalPokedexNumber}</td>
              <td style={{ width: '180px' }}>{name}</td>

              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.removeCollection(collection_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      
       
     </div>
    );
  }
}

export default CollectionCard;
