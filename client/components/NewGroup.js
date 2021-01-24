import React from 'react'
import {Form, Button} from 'react-bulma-components'
import {connect} from 'react-redux'
import {createGroup} from '../store/groups'

export class NewGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      participant: ''
    }
    this.initialState = this.state
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createGroup()
    this.setState(() => this.initialState)
    this.props.history.push(`/groups`)
  }

  render() {
    const {user} = this.props
    return (
      <div>
        {
          <form onSubmit={this.handleSubmit}>
            <Form.Field size="small">
              <Form.Input
                placeholder="Add users"
                name="participant"
                type="text"
                onChange={this.handleChange}
                value={this.state.participant}
              />
              <Form.Control>
                <Button className="submit-button is-focused is-primary">
                  <strong>Create Group</strong>
                </Button>
              </Form.Control>
            </Form.Field>
          </form>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    plants: state.plants,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGroup: participantId => dispatch(createGroup(participantId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup)
