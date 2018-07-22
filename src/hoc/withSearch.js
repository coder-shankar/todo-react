import React from "react";
import axios from "axios";

const withSearch = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        input: "",
        list: []
      };
    }

    //function to search based on title
    filter = list => {
      let filterList = list.filter(e =>
        e.title.toLowerCase().includes(this.state.input.toLowerCase())
      );

      return filterList;
    };

    render() {
      return (
        <div>
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
          <Component list={this.props.lists.data} />
        </div>
      );
    }
  }
  return MyComponent;
};
export default withSearch;
