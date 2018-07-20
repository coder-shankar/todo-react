import React from "react";
import axios from "axios";
const withFetchData = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        list: [],
        query: ""
      };
    }

    fetchData = async (query = "") => {
      try {
        const token = localStorage.getItem("accessToken").toString();
        let res = await axios({
          method: "get",
          url: "http://127.0.0.1:8848/api/todos" + query,
          headers: {
            "Content-Type": "application/json",
            oauth: token
          }
        });

        this.setState({ list: res.data });
      } catch (err) {
        console.log(err);
      }
    };

    componentDidMount() {
      this.fetchData();
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.query != nextProps.query) {
        this.fetchData("?title=" + nextProps.query);
      }
    }

    render() {
      console.log(this.props, "prp from withfetch data");
      return (
        <Component lists={this.state.list} setQuery={this.props.setQuery} />
      );
    }
  }

  return MyComponent;
};

export default withFetchData;
