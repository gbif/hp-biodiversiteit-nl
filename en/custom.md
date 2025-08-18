---
layout: documentation
sideNavigation: sidenav.taxonomy
title: My Custom Query
permalink: /custom/query
---

<!-- load react -->
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>

<div id="customQuery"></div>

<script>
'use strict';
const e = React.createElement;

class CustomQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: null, data: [] };
  }

  componentDidMount() {
    fetch('https://disscover.dissco.eu/api/digital-specimen/v1/10.3535/8RW-F8N-H0T')
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.results || json, loading: false });
      })
      .catch(err => {
        this.setState({ error: err.toString(), loading: false });
      });
  }

  render() {
    if (this.state.loading) return e('p', null, 'Loading…');
    if (this.state.error) return e('p', null, 'Error: ' + this.state.error);

    return e('ul', null,
      this.state.data.map((item, i) =>
        e('li', { key: i }, JSON.stringify(item))
      )
    );
  }
}
const domContainer = document.querySelector('#customQuery');
ReactDOM.render(e(CustomQuery), domContainer);
</script>
