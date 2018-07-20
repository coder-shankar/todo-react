import React from "react";
import Loader from "./Loader";
const withLoader = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
    }

    render() {
      console.log(this.props, "props from fetch");
      return this.props ? <Component {...this.props} /> : <Loader />;
    }
  }

  return MyComponent;
};

export const withLoader2 = Component => ({ lists, ...rest }) => {
  return lists && lists.length > 0 ? (
    <Component lists={lists} {...rest} />
  ) : (
    <Loader />
  );
};

// return props ? <Component {...props} /> : <Loader />;

export default withLoader;
