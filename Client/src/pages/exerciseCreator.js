import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {EXERCISE_UPDATE, EXERCISE_ADD} from '../actions/exercisesActions'
import axios from 'axios'
import {CONFIG_ULR} from '../config'

class ExerciseCreator extends Component {

  componentWillMount() {
    if (this.props.params)
      this.getExercises(this.props.params.id)
  }

  getExercises(id) {
    let that = this;
    let token = this.props.token;
    axios.get(`${CONFIG_ULR}/exercises/get/${token}/${id}`).then(response => {
      this.exercise = response.data.data
      console.log(this.exercise)
    }).catch(error => {console.log(error)})
  }

  render() {
    let {props} = this;
    console.log(this.exercise);
    return (<div className="has-text-centered">
      <h1>{
          props.params
            ? 'Editor'
            : 'Creator'
        }</h1>
      {
        props.params &&< p > Exercise id: {
          props.params.id
        }
        </p>
      }
    </div>)
  }
}

function mapStateToProps(state) {
  return {token: state.auth.token};
}

function mapDispatchToProps(dispatch) {
  return {
    updateExercise: () => {}
  }
}

var ExerciseCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(ExerciseCreator)

export default ExerciseCreatorContainer;
