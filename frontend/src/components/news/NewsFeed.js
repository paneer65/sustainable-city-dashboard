import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import moment from 'moment';

export default class NewsFeed extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newsItems: props.newsItems,
      isLoaded: props.isLoaded,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoaded && !prevProps.isLoaded) {
      this.setState({
        'isLoaded': true,
        'newsItems': this.props.newsItems
      });
    } else if (!this.props.isLoaded && prevProps.isLoaded) {
      this.setState({
        'isLoaded': false,
        'newsItems': []
      });
    }
  }

  render() {
    if (this.state.newsItems && this.state.isLoaded) {
      // Render news items
      let newsFeed = this.state.newsItems.map((news) => {
        return (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ news.url_to_image } />
            <Card.Body>
              <Card.Title>{ news.title }</Card.Title>
              <Card.Text>
                { news.description }
              </Card.Text>
            </Card.Body>
            <Card.Footer>Published at { moment(news.published_at).fromNow() }</Card.Footer>
            <Card.Link href={ news.url }>Full Story</Card.Link>
          </Card>
        )
      });

      return (
        <div>
          <CardColumns>
            { newsFeed }
          </CardColumns>
        </div>
      );
    } else {
      // Render empty view
      return (
        <div id="no-results" className="text-muted"><center>No results found</center></div>
      )
    }
  }
}
