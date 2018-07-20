import React from "react";

const withLoginScreen = Component => {
  class MyComponent extends React.Component {
    handleOnChange = e => {
      this.props.getLoginInfo(e);
    };

    render() {
      console.log(this.props);
      return !this.props.loginStatus ? (
        <div className="loginWrapper">
          <form method="post">
            <label> UserName:</label>
            <input type="text" name="username" onChange={this.handleOnChange} />
            <br />
            <label> Password:</label>
            <input
              type="password"
              name="password"
              onChange={this.handleOnChange}
            />
            <br />
            <button onClick={this.props.loginHandler}>Login</button>
          </form>
        </div>
      ) : (
        <Component query={this.props.query} setQuery={this.props.setQuery} />
      );
    }
  }
  return MyComponent;
};
export default withLoginScreen;
