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
      console.log(nextProps, "props next");
      if (this.props.query != nextProps.query) {
        this.fetchData(
          "?title=" +
            nextProps.query +
            "&&page=" +
            nextProps.page +
            "&&limit=" +
            nextProps.limit
        );
      } else {
        this.fetchData(
          "?title=" +
            nextProps.query +
            "&&page=" +
            nextProps.page +
            "&&limit=" +
            nextProps.limit
        );
      }
    }

    // item change handler
    itemChangeHandler = async e => {
      await this.props.setPager(1, e.target.value);
    };

    render() {
      console.log(this.props, "prp from withfetch data");
      return (
        <div>
          <label>Item:</label>
          <select onChange={this.itemChangeHandler}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <Component lists={this.state.list} setQuery={this.props.setQuery} />
          <div>
            {/* should be dynamic button */}
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </div>
        </div>
      );
    }
  }

  return MyComponent;
};

export default withFetchData;
