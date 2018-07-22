import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import withLoader, { withLoader2 } from "./hoc/withLoader";
import withFetchData from "./hoc/withFetchData";
import withSearch from "./hoc/withSearch";

import withLogin from "./login/withLogin";
import withLoginScreen from "./login/loginScreen";

const List = ({ list = [] }) => {
  console.log(list);
  return (
    <table>
      {list.map((item, i) => (
        <tr>
          <td> {item.title}</td>
          <td>{item.description}</td>
          <td>{item.userId} </td>
        </tr>
      ))}
    </table>
  );
};

const Fetch = withFetchData(withLoader(withSearch(List)));
const Login = withLogin(
  withLoginScreen(withFetchData(withLoader(withSearch(List))))
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      page: 1,
      limit: 1
    };
  }

  fetchQuery = query => {
    this.setState({ query: query });
  };

  fetchPageQuery = async (page, limit) => {
    await this.setState({ page: page, limit: limit });
  };

  render() {
    console.log("app");
    return (
      <div className="App">
        {/* <Fetch query={this.state.query} setQuery={this.fetchQuery} /> */}
        <Login
          query={this.state.query}
          setQuery={this.fetchQuery}
          setPager={this.fetchPageQuery}
          page={this.state.page}
          limit={this.state.limit}
        />
      </div>
    );
  }
}

export default App;
