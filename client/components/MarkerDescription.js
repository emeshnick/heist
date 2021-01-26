import React from 'react'
import {Button} from 'react-bulma-components'

export default class MarkerDescription extends React.Component {
  handleClick = () => {
    console.log('deleted')
    this.props.deleteMarker(this.props.info.id)
  }

  render() {
    const {info} = this.props
    return (
      <div>
        <div>
          <div>Added: {info.createdAt.slice(0, 9)} </div>
          <Button onClick={this.handleClick}>Delete Marker</Button>
        </div>
      </div>
    )
  }
}
