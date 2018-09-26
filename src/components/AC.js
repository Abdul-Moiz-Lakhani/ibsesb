import React, { Component } from 'react'
import { Switch } from 'react-native'
import {Card, ListItem} from 'react-native-elements'
import {connect} from 'react-redux' 
import { toggleStatus } from "./../store/actions/applianceRecord"

class AC extends Component {

  render() {

    return (
      <Card containerStyle={{padding: 0}} >
        {
          this.props.record.map((u, i) => 
            u.id === 'ac' ? (
              <ListItem
                key={i}
                title={u.name}
                rightIcon={<Switch value={u.status} onValueChange={()=>toggleStatus(u.id, u.status)} />}
              />
            ) : null
          )
        }
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      record: state.appliances.appliances
  }
}

export default connect(mapStateToProps, null)(AC);