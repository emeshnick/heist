import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MapGl from './MapGl'
import Dropdown from './Dropdown'

const items = []
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Dropdown title="Messages" items={items} multiSelect />
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
UserHome.propTypes = {
  email: PropTypes.string
}
