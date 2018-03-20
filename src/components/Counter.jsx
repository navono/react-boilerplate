import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
export default class Counter extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{"Hello, World! I'm counting..."}</p>
        <p id="count">{this.props.count}</p>
        <Button type="primary" onClick={this.props.onIncrease}>
          increament
        </Button>
        <Button type="primary" onClick={this.props.onDecrease}>
          decrement
        </Button>
      </div>
    );
  }
}
