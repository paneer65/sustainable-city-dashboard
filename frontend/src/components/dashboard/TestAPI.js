import React from 'react';

class TestAPI extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("https://api.aerisapi.com/airquality/54,-6?&format=json&client_id=Exik7969JcHsSL3U64xUO&client_secret=ROLPPIhTSQwRMtuXWhyd1IfOIYKP9aPV6hmtT2xH")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: JSON.stringify(result.response[0])
            });
            console.log(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        //console.log(result)
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div>
            {items}
          </div>
        );
      }
    }
  }

export default TestAPI;