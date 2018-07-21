import React from "react";
import axios from "axios";

const withSearch = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        input: "",
        list: [],
        pageLimit: 1
      };
    }

    //function to search based on title
    filter = list => {
      let filterList = list.filter(e =>
        e.title.toLowerCase().includes(this.state.input.toLowerCase())
      );

      return filterList;
    };

    // item change handler
    itemChangeHandler = async e => {
      await this.setState({ pageLimit: e.target.value });
      //get data from database
      this.fetchData(1, this.state.pageLimit);
    };

    //function which to get todos from database
    fetchData = async (page, limit) => {
      console.log(limit, page);
      try {
        const token = localStorage.getItem("accessToken").toString();
        let res = await axios({
          method: "get",
          url:
            "http://127.0.0.1:8848/api/todos?page=" + page + "&&limit=" + limit,
          headers: {
            "Content-Type": "application/json",
            oauth: token
          }
        });

        this.setState({ list: res.data });
        console.log(res.data.data, "res.data");
        console.log(this.props.lists.data, "this.props.lists.data");
      } catch (err) {
        console.log(err);
        alert(err);
      }
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

          <input
            type="text"
            name="input"
            onChange={e => {
              this.setState({ [e.target.name]: e.target.value });
              console.log(this.props, "props ");

              this.props.setQuery(e.target.value);
            }}
          />
          {/* this.props.lists.data */}
          <Component list={this.state.list.data} />
        </div>
      );
    }
  }
  return MyComponent;
};
export default withSearch;
