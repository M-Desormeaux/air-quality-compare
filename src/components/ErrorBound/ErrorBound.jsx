import React from "react";

export class ErrorBound extends React.Component {
  constructor(props) {
    super(props);
    this.state = { children: props.children, error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>;
    }
    return this.state.children;
  }
}
