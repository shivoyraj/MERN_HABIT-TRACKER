    import React from 'react';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { useNavigate } from 'react-router-dom';

    function HomePage(props) {

        const navigate = useNavigate();
        const allHabitsObj = props.allHabitsObj;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Habit Tracker</a>
                    <a className="nav-link text-dark" onClick={() => navigate(`/status`)}>Track Habits</a>
                </nav>
                <div className="container mt-5">
                    <h3>Add a Habit</h3>
                    <form onSubmit={props.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="habitName">Habit Name</label>
                            <input type="text" className="form-control" ref={props.habitNameRef} required />
                        </div>
                        <button type="submit" className="btn btn-success">Add Habit</button>
                    </form>
                    <hr />
                    <h3>Current Habits</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Habit Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allHabitsObj.map((habit) => (
                                <tr key={habit._id}>
                                    <td>{habit.title}</td>
                                    <td>
                                        <a onClick={() => props.handleDelete(habit._id)} className="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    export default HomePage;
