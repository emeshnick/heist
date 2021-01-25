import React from 'react'

export default class MarkerDescription extends React.Component {
  render() {
    const {info} = this.props
    return (
      <div>
        <div>Added: {info.createdAt.slice(0, 9)} </div>
      </div>
    )
  }
}
