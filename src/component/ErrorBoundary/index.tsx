import React from "react";
import { NextRouter, withRouter } from "next/router";

/**
 * Handle JS errors in the code and log the errors
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo }, this.state);
  }
  render() {
    if (this.state.hasError) <></>;
    return this.props.children;
  }
}

interface Props {
  children: JSX.Element | JSX.Element[];
  router: NextRouter;
}

interface State {
  hasError: boolean;
}

export default withRouter(ErrorBoundary);