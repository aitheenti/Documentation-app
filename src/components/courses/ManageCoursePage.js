import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
	courses,
	authors,
	loadCourses,
	loadAuthors,
	...props
}) {
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (courses.length === 0) {
			loadCourses().catch((error) => {
				alert("loading courses failed" + error);
			});
		}

		if (authors.length === 0) {
			loadAuthors().catch((error) => {
				alert("loading authors failed" + error);
			});
		}
	}, []);

	function handleSave(event) {
		event.preventDefault();
		saveCourse(course);
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setCourse((prevCourse) => ({
			...prevCourse,
			[name]: name === "authorId" ? parseInt(value, 10) : value,
		}));
	}
	return (
		<CourseForm
			authors={authors}
			errors={errors}
			course={course}
			onChange={handleChange}
			onSave={handleSave}
		/>
	);
}

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loadCourses: PropTypes.func.isRequired,
	authors: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired,
	saveCourse: PropTypes.func.isRequired,
};

//Redux mappings | determines what state is passed to our component via props
function mapStateToProps(state) {
	return {
		course: newCourse,
		courses: state.courses,
		authors: state.authors,
	};
}

const mapDispatchToProps = {
	loadCourses,
	loadAuthors,
	saveCourse,
};

//Redux Connect | determines what actions to pass to our component on props
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
