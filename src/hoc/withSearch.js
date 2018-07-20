import React from "react";

const withSearch = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        input: "",
        list: []
      };
    }

    filter = list => {
      let filterList = list.filter(
        e =>
          e.title.toLowerCase().includes(this.state.input.toLowerCase()) ||
          e.description.toLowerCase().includes(this.state.input.toLowerCase())
      );

      return filterList;
    };

    render() {
      //   let list = this.filter(this.props.lists);

      //   console.log(list);

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
          <Component list={this.props.lists.data} />
        </div>
      );
    }
  }
  return MyComponent;
};

export default withSearch;
