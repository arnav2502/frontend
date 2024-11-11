import axios from 'axios';
import { useEffect, useState } from 'react';
import './Student.css';  // Add custom CSS for fancy styles

function Student() {
  const [studentid, setId] = useState('');
  const [studentname, setName] = useState('');
  const [studentaddress, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("https://backend-arnav.onrender.com/api/v1/student/getall");
      setUsers(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://backend-arnav.onrender.com/api/v1/student/save", {
        studentname: studentname,
        studentaddress: studentaddress,
        mobile: mobile,
      });
      alert('Student Registration Successfully');
      setId('');
      setName('');
      setAddress('');
      setMobile('');
      Load();
    } catch (err) {
      alert('User Registration Failed');
      console.error('Save error:', err);
    }
  }

  async function editStudent(student) {
    setName(student.studentname);
    setAddress(student.studentaddress);
    setMobile(student.mobile);
    setId(student._id);
  }

  async function DeleteStudent(studentid) {
    try {
      await axios.delete(`https://backend-arnav.onrender.com/api/v1/student/delete/${studentid}`);
      alert('Student deleted successfully');
      Load();
    } catch (error) {
      alert('Failed to delete student');
      console.error('Delete error:', error);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`https://backend-arnav.onrender.com/api/v1/student/edit/${studentid}`, {
        studentname: studentname,
        studentaddress: studentaddress,
        mobile: mobile,
      });
      alert('Registration Updated');
      setId('');
      setName('');
      setAddress('');
      setMobile('');
      Load();
    } catch (err) {
      alert('Update failed');
      console.error('Update error:', err);
    }
  }

  return (
    <div className="student-app">
      <div className="header">
        <h3> Name : Arnav Chiddarwar</h3>
        <h3>Roll no: 446 </h3>
        <h3>Section: A</h3>
        <h3>PRN: 2146491245052</h3>
        <h3>Cloud Computing Ca 2</h3>
      </div>

      <div className="content">
        <h1 className="title">Employee Registration</h1>
        <div className="form-container">
          <form className="student-form">
            <div className="form-group">
              <label htmlFor="studentname">Name</label>
              <input
                type="text"
                id="studentname"
                value={studentname}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentaddress">Address</label>
              <input
                type="text"
                id="studentaddress"
                value={studentaddress}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="form-control"
              />
            </div>
            <div className="button-group">
              {studentid ? (
                <button className="btn-success" onClick={update}>
                  Update
                </button>
              ) : (
                <button className="btn-primary" onClick={save}>
                  Save
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentname}</td>
                  <td>{student.studentaddress}</td>
                  <td>{student.mobile}</td>
                  <td>
                    <button
                      className="btn-warning"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => DeleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Student;
