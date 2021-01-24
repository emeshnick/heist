import React from 'react'
import {connect} from 'react-redux'
import {fetchGroups} from '../store/groups'

class Groups extends React.Component {
  componentDidMount() {
    this.props.fetchgroups()
  }

  render() {
    const {groups} = this.props
    return (
      <div>
        {groups.map(group => {
          return (
            <div key={group.id}>
              <h1>Conversation {group.id}</h1>
              <p>
                Includes{' '}
                {group.participant.map(participant => participant.email)}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}
const mapState = state => {
  return {
    groups: state.groups
  }
}

const mapDispatch = dispatch => {
  return {
    fetchgroups: () => dispatch(fetchGroups())
  }
}

export default connect(mapState, mapDispatch)(Groups)
