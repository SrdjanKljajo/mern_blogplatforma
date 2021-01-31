import React from 'react'

const SHORTNAME = ''
const WEBSITE_URL = ''

function renderDisqus() {
  if (window.DISQUS === undefined) {
    var script = document.createElement('script')
    script.async = true
    script.src = 'https://' + SHORTNAME + '.disqus.com/embed.js'
    document.getElementsByTagName('head')[0].appendChild(script)
  } else {
    window.DISQUS.reset({ reload: true })
  }
}

class DisqusThread extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props._id !== nextProps._id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path
    )
  }

  componentDidMount() {
    renderDisqus()
  }

  componentDidUpdate() {
    renderDisqus()
  }

  render() {
    let { _id, title, path, ...other } = this.props

    if (process.env.BROWSER) {
      window.disqus_shortname = SHORTNAME
      window.disqus_identifier = _id
      window.disqus_title = title
      window.disqus_url = WEBSITE_URL + path
    }

    return <div {...other} id='disqus_thread' />
  }
}

export default DisqusThread
