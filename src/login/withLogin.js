import React from "react";
import axios from "axios";

const withLogin = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        username: "",
        password: "",
        loginStatus: false
      };
    }

    setLoginInfo = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    loginHandler = async e => {
      e.preventDefault();
      console.log("method is invoked");
      try {
        let res = await axios({
          method: "post",
          url: "http://127.0.0.1:8848/api/login",
          data: { email: this.state.username, password: this.state.password },
          config: {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }
        });
        if (res.status == 200) {
          this.setState({ loginStatus: true });
          const { accessToken, refreshToken } = res.data;
          console.log("accessToken", accessToken);

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };

    render() {
      return (
        <Component
          loginStatus={this.state.loginStatus}
          getLoginInfo={this.setLoginInfo}
          loginHandler={this.loginHandler}
          setQuery={this.props.setQuery}
          query={this.props.query}
        />
      );
    }
  }

  return MyComponent;
};

export default withLogin;
