import React from "react";

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
    alert(this.state.course.title)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2> Courses</h2>
        <h3> Add Course </h3>
        <input type="text"
        onChange={this.handleChange}
        value={this.state.course.title}/>

        <input type="submit" value="save" />
      </form>
    )
    
  }
}

export default CoursesPage;
