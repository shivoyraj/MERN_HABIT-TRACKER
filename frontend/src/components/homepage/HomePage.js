import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function HomePage(props) {
    const navigate = useNavigate();
    const allHabitsObj = props.allHabitsObj;

    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Habit Tracker</a>
                <a className="nav-link text-dark" onClick={() => navigate(`/status`)}>Track Habits</a>
            </nav>
            {/* Main content */}
            <div className="container mt-5">
                <h3>Add a Habit</h3>
                {/* Habit form */}
                <form onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="habitName">Habit Name</label>
                        <input type="text" className="form-control" ref={props.habitNameRef} required />
                    </div>
                    <button type="submit" className="btn btn-success">Add Habit</button>
                </form>
                <hr />
                <h3>Current Habits</h3>
                {/* Table for displaying current habits */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Habit Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loop over habits and display them */}
                        {props.isLoading ? (
                            <tr>
                                <td colSpan="2" className="text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : (
                            allHabitsObj.map((habit) => (
                                <tr key={habit._id}>
                                    <td>{habit.title}</td>
                                    <td>
                                        {/* Delete button */}
                                        <a onClick={() => props.handleDelete(habit._id)} className="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;