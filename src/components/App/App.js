import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }
  addUrl = async (longUrl, title) => {
    await postUrl(longUrl, title)
    const allUrls = await getUrls()
    this.setState({ urls: allUrls.urls})
  }
  async componentDidMount() {
    const allUrls = await getUrls()
    if(!allUrls) {
      this.setState({ urls: []})
    } else {
      this.setState({ urls: allUrls.urls})

    }
  }
  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
