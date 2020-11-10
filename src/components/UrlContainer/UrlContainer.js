import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  if(!props.urls) {
    return (
      <section data-testid="urlContainer" className="urlContainer">
        <p>No urls yet! Find some to shorten!</p>
      </section>
    )
  } else {
    const urlEls = props.urls.map((url, index) => {
      return (
        <div key={index} className="url">
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        </div>
      )
    });
    return (
      <section data-testid="urlContainer" className="urlContainer">
        {urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p>}
      </section>
    )
  }
}

export default UrlContainer;
