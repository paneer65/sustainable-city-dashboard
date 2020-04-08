import React from 'react'
import axios from "axios"
import NewsFeed from './NewsFeed';

export default class NewsIndex extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      todaysNews: [],
      isLoaded: false
    }

    this.fetchTodaysNews();
  }

  fetchTodaysNews() {
  	axios({
			url: '/api/news/',
			method: 'GET'
		}).then((response) => {
			if(response.status === 200) {
				this.setState({ todaysNews: response.data, isLoaded: true });
			} else {
        this.setState({ todaysNews: [], isLoaded: false });
      }
		});
  }

  render() {
    return (
      <div>
        <NewsFeed
          newsItems={ this.state.todaysNews }
          isLoaded={ this.state.isLoaded }
        />
      </div>
    )
  }
}
