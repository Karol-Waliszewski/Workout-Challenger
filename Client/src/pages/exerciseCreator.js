import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {EXERCISE_UPDATE, EXERCISE_ADD, EXERCISE_GET} from '../actions/exercisesActions'

class ExerciseCreator extends Component {

  componentWillMount() {
    if (this.props.params)
      this.props.getExercise(this.props.token, this.props.params.id);
    }

  render() {
    let {props} = this;
    return (<div className="has-text-centered">
      <h1>{
          props.params
            ? 'Editor'
            : 'Creator'
        }</h1>
      {
        props.exercise && <div>
            <p>
              Exercise id: {props.exercise._id}
            </p>
            <p>
              Exercise name: {props.exercise.name}
            </p>
            <input type="text" onChange={(e) => {
                props.updateExercise('name',e.target.value);
              }}/>
          </div>
      }
    </div>)
  }
}

function mapStateToProps(state) {
  return {token: state.auth.token, exercise: state.exercises.exercise};
}

function mapDispatchToProps(dispatch) {
  return {
      updateExercise:(prop,value) =>{
        dispatch(EXERCISE_UPDATE(prop,value));
      },
    //TODO
    //sendExercise: (exercise)=>{dispatch(EXERCISE_SEND(exercise))},
    getExercise: (token, id) => {
      dispatch(EXERCISE_GET(token, id));
    }
  }
}

var ExerciseCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(ExerciseCreator)

export default ExerciseCreatorContainer;
