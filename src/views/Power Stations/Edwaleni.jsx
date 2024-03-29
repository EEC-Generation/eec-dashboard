import React, { Component } from "react";
import { InflowsContext } from "../../components/Context/context";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export class Edwaleni extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      edwaleniPS: {
        Name: "Edwaleni Power Station",
        Rated_Head: "262",
        Total_Power_Output: "15",
        Genarators: [
          {
            Rated_Power: "2.5",
            Rated_Flow: "0.240",
            Units: "4",
          },
          {
            Rated_Power: "5",
            Rated_Flow: "0.470",
            Units: "1",
          },
        ],
      },
      disabled: true,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      edwaleniPS: nextProps.edwaleniPS,
    };
  }
  handleEdwaleniInputChange = (e) => {
    if (e.target.id === "Rated_Flow") {
      this.setState({ disabled: false });
      let edwaleniPS = this.state.edwaleniPS;
      edwaleniPS.Genarators[0].Rated_Flow = e.target.value;
      this.setState({ edwaleniPS });
    }

    if (e.target.id === "Rated_Power") {
      this.setState({ disabled: false });
      let edwaleniPS = this.state.edwaleniPS;
      let smallSetPower = e.target.value;
      edwaleniPS.Genarators[0].Rated_Power = smallSetPower;

      if (smallSetPower > 2.5 || smallSetPower < 1) {
        this.setState({ disabled: true });
      } else {
        // set total power output
        let totalPowerOutput =
          parseFloat(smallSetPower) * 4 +
          parseFloat(this.state.edwaleniPS.Genarators[1].Rated_Power);
        edwaleniPS.Total_Power_Output = +totalPowerOutput;
      }

      this.setState({ edwaleniPS });
    }
  };
  handleEdwaleniRatedInputChange = (e) => {
    if (e.target.id === "Rated_Flow") {
      this.setState({ disabled: false });
      let edwaleniPS = this.state.edwaleniPS;
      edwaleniPS.Genarators[1].Rated_Flow = e.target.value;
      this.setState({ edwaleniPS });
    }
  };
  handleRatedFlowChange = () => {
    this.context.editRatedFlow(this.state.edwaleniPS);
    this.setState({ disabled: true });
  };
  render() {
    const { edwaleniPS, disabled } = this.state;
    const { loading } = this.context;
    const { admin } = this.props;
    return (
      <>
        {!loading && (
          <Col md="12" lg="6" xl="6">
            <Card>
              <CardHeader>
                <h5 className="title">{edwaleniPS.Name}</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Total Power Output (MW)</label>
                        <Input
                          onChange={this.handleEdwaleniInputChange}
                          value={edwaleniPS.Total_Power_Output}
                          type="number"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Rated Head (m)</label>
                        <Input
                          onChange={this.handleEdwaleniInputChange}
                          value={edwaleniPS.Rated_Head}
                          disabled={true}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Generators</label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Rated Power (MW)</label>
                        <Input
                          onChange={this.handleEdwaleniInputChange}
                          value={edwaleniPS.Genarators[0].Rated_Power}
                          disabled={!admin}
                          id="Rated_Power"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Units</label>
                        <Input
                          onChange={this.handleEdwaleniInputChange}
                          value={edwaleniPS.Genarators[0].Units}
                          disabled={true}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Rated Flow (m³/s/MW)</label>
                        <Input
                          onChange={this.handleEdwaleniInputChange}
                          value={edwaleniPS.Genarators[0].Rated_Flow}
                          id="Rated_Flow"
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <Input
                          onChange={this.handleEdwaleniInputChange}
                          value={edwaleniPS.Genarators[1].Rated_Power}
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <Input
                          onChange={this.handleEdwaleniInputChange}
                          value={edwaleniPS.Genarators[1].Units}
                          disabled={true}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <Input
                          onChange={this.handleEdwaleniRatedInputChange}
                          value={edwaleniPS.Genarators[1].Rated_Flow}
                          id="Rated_Flow"
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={this.handleRatedFlowChange}
                  disabled={disabled}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        )}
      </>
    );
  }
}

export default Edwaleni;
