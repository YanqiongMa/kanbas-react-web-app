import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import { FaPlus } from "react-icons/fa";
import * as client from "./client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  // Fetch all users
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  // Create a new user
  const createUser = async () => {
    const loginIdValue = Date.now();
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${loginIdValue}`,
      password: "password123",
      loginId: `${loginIdValue}S`,
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers((prev) => [...prev, user]);
  };

  // Filter users by name
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const filteredUsers = await client.findUsersByPartialName(name);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  // Filter users by role
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const filteredUsers = await client.findUsersByRole(role);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  // Effect to fetch users on component mount or when `uid` changes
  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      {/* Add User Button */}
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <h3>Users</h3>

      {/* Filter by Name */}
      <input
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name"
      />

      {/* Filter by Role */}
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      {/* Users Table */}
      <PeopleTable users={users} />
    </div>
  );
}
