import React from "react";
import axios from "axios";

const withFetchTodos = Component => {
  class MyComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        list: []
      };
    }

    fetchData = ()=>{
        let res = await axios({
            method: "get",
            url: "http://127.0.0.1:8848/api/todos",
            config: {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                oauth: localStorage.getItem("accessToken")
              }
            }
          });

    }
    componentDidMount(){
        this.fetchData();
    }
  }
};

export default withFetchTodos;


