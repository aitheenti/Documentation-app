import React from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
  state = {
    course: {
      title: ""
    }
  }

  handleChange = e => {
    const course = { ...this.state.course, title: e.target.value};
    this.setState({ course })
  }

  handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    this.props.actions.createCourse(this.state.course);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2> Courses</h2>
        <h3> Add Course </h3>
        <input type="text"
        onChange={this.handleChange}
        value={this.state.course.title}/>

        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}> {course.title} </div>))}
      </form>
    )
    
  }
}

CoursesPage.PropTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

//determines what state is passed to our component via props
function mapStateToProps (state) {
  debugger
  return {
    courses: state.courses
  }
}

function mapDispatchToProps(dispatch) {
  return{
    actions: bindActionCreators(courseActions, dispatch)
  }
}

//determines what actions to pass to our component on props

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
