import React, { Component } from 'react'
import { Switch } from 'react-native'
import {Card, ListItem} from 'react-native-elements'
import {connect} from 'react-redux' 
import { toggleStatus } from "./../store/actions/applianceRecord"

class All extends Component {

  render() {

    return (
      <Card containerStyle={{padding: 0}} >
        {
          this.props.record.map((u, i) => {

            return (
              <ListItem
                key={i}
                title={u.name}
                rightIcon={<Switch value={u.status} onValueChange={()=>toggleStatus(u.id, u.status)} />}
              />
            );
          })
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

export default connect(mapStateToProps, null)(All);