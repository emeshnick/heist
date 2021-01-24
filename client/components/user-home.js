import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MapGl from './MapGl'
import ChatMenu from './ChatMenu'

/**
 * COMPONENT
 */
export const UserHome = props => {
  // const {email} = props

  return (
    <div>
      <ChatMenu title="Messages" />
      <MapGl />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
