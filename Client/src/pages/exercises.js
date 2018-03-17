import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {EXERCISES_GET, EXERCISE_FILTER, EXERCISE_RESET} from '../actions/exercisesActions'

class Exercises extends Component {

  componentWillMount() {
    this.props.getExercises(this.props.token);
  }

  filterExercise(exercise) {
    let {exerciseFilter} = this.props;

    if (exerciseFilter === null)
      return true;

    let propType = typeof exercise[exerciseFilter.prop];
    switch (propType) {
      case 'string':
        return exercise[exerciseFilter.prop].toUpperCase().indexOf(exerciseFilter.value.toUpperCase()) > -1;
      case 'boolean':
        return exercise[exerciseFilter.prop] === exerciseFilter.value;
    }
  }

  listExercises(exercises) {
    return exercises.map((exercise) => {
      if (this.filterExercise(exercise))
        return (<div className="panel-block" key={exercise._id}>
          <span className="panel-icon">
            <FontAwesomeIcon icon="circle"/>
          </span>
          <span style={{
              paddingTop: exercise.author === 'default'
                ? "0.25rem"
                : null,
              paddingBottom: exercise.author === 'default'
                ? "0.25rem"
                : null
            }}>{exercise.name}</span>
          {
            exercise.author !== 'default' && <div className="buttons has-addons is-right is-m-l-a">
                <Link type="button" className="button is-primary is-inverted is-pulled-right" to={`/exercises/edit/${exercise._id}`}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="edit"/>
                  </span>
                </Link>

                <button type="button" className="button is-danger is-inverted is-pulled-right" onClick={() => {
                    this.props.deleteExercise(exercise._id)
                  }}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="ban"/>
                  </span>
                </button>
              </div>
          }
        </div>)
      else
        return null;
      }
    )
  }

  render() {
    let {props} = this;
    return (<div>
      <div className="panel">
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="search an exercise..." onChange={(e) => {
                props.updateFilter(e.target.value)
              }}/>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="search"/>
            </span>
          </p>
        </div>
        <p className="panel-tabs">
          <a className="is-active" onClick={props.resetFilter}>all</a>
          <a onClick={() => {
              props.updateFilter(false, "private");
            }}>public</a>
          <a onClick={() => {
              props.updateFilter(true, "private");
            }}>private</a>
          <a>beginner</a>
          <a>advanced</a>
        </p>
        {props.exercises && this.listExercises(props.exercises)}
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  // TODO change exercises.exercises to something more creative
  return {exercises: state.exercises.exercises, token: state.auth.token, exerciseFilter: state.exercises.exerciseFilter};
}

function mapDispatchToProps(dispatch) {
  // TODO
  return {
    getExercises: (token) => {
      dispatch(EXERCISES_GET(token))
    },
    deleteExercise: (id) => {
      // TODO Deleting exercises
      console.log(id);
    },
    updateFilter: (value, prop = "name") => {
      let filter = {
        value,
        prop
      }
      dispatch(EXERCISE_FILTER(filter));
    },
    resetFilter: () => {
      dispatch(EXERCISE_RESET());
    }
  }
}

var ExercisesContainer = connect(mapStateToProps, mapDispatchToProps)(Exercises)

export default ExercisesContainer;
