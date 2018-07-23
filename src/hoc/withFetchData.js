import React from "react";
import axios from "axios";
const withFetchData = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        list: [],
        query: "",
        buttons: [1, 2]
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
    range = (start, end) => {
      var ans = [];
      for (let i = start; i <= end; i++) {
        ans.push(i);
      }
      return ans;
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
      console.log(this.state.list.total.fulfillmentValue, "total data");
      let array = this.range(
        1,
        Math.ceil(this.state.list.total.fulfillmentValue / this.props.limit)
      );
      this.setState({ buttons: array });
    }

    // item change handler
    itemChangeHandler = async e => {
      await this.props.setPager(
        Math.ceil(this.state.list.total.fulfillmentValue / this.props.limit),
        e.target.value
      );
    };
    pageChageHandler = () => {
      let page = Math.ceil(
        this.state.list.total.fulfillmentValue / this.props.limit
      );
      this.fetchData(
        "?title=" +
          this.props.query +
          "&&page=" +
          page +
          "&&limit=" +
          this.props.limit
      );
    };

    render() {
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
            {this.state.buttons.map((item, i) => (
              <button onClick={this.pageChageHandler}> {item}</button>
            ))}
          </div>
        </div>
      );
    }
  }

  return MyComponent;
};

export default withFetchData;
