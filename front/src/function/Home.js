import React, { useState } from 'react';
import { gql, useMutation, useQuery,  } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_USERS = gql`
  query users {
    getusers{
      id
      name
      email
      age
    }
}
`;

const CREATE_USER = gql`
mutation Create($email: String, $name: String, $age: Int) {
  createuser(email: $email, name: $name, age: $age) {
    age
    email
    id
    name
  }
}
`;

const DELETE_USER = gql`
mutation Delete($id: ID) {
  deleteuser(id: $id) {
    age
    email
    id
    name
  }
}
`;

const UPDATE_USER = gql`
  mutation Update($id: ID, $email: String, $name: String, $age: Int) {
    updateuser(id: $id, name: $name, email: $email, age: $age) {
      age
      email
      id
      name
    }
  }
`;

function Home() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => refetch(),
    onError: (error) => {
      alert(`Error: ${error.message}`);
    }
  });
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => refetch()
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => refetch()
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const [updateFormData, setUpdateFormData] = useState({
    id: '',
    name: '',
    email: '',
    age: ''
  });

  const history = useNavigate();
  
  const routeChange = (id) =>{ 
    let path = `/user/`+id; 
    history(path);
  }

  const handleCreateUser = () => {
    if (!formData.name || !formData.email || !formData.age) {
      alert('Please fill in all fields');
      return;
    }
    createUser({ variables: { ...formData, age: parseInt(formData.age) } });
    setFormData({ name: '', email: '', age: '' });
  };

  const handleDeleteUser = (id) => {
    deleteUser({ variables: { id } });
  };

  const handleUpdateUser = () => {
    const { id, name, email, age } = updateFormData;
    updateUser({ variables: { id, name, email, age: parseInt(age) } });
    setUpdateFormData({ id: '', name: '', email: '', age: '' });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <h1>User Search</h1>
        <h1>User List</h1>
        <ul>
          {data.users.map(user => (
            <li key={user.id}>
              <div>
                <span>ID: {user.id}</span><br />
                <span>Name: {user.name}</span><br />
                <span>Email: {user.email}</span><br />
                <span>Age: {user.age}</span>
              </div>
              <button color="primary" className="px-4"
                onClick={() => routeChange(user.id)}>
                View
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              <button onClick={() => setUpdateFormData(user)}>Update</button>
            </li>
          ))}
        </ul>
        <h2>Create User</h2>
        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <button onClick={handleCreateUser}>Create</button>

        {/* Form for updating user */}
        {updateFormData.id && (
          <div>
            <h2>Update User</h2>
            <input type="text" placeholder="Name" value={updateFormData.name} onChange={e => setUpdateFormData({ ...updateFormData, name: e.target.value })} />
            <input type="number" placeholder="Age" value={updateFormData.age} onChange={e => setUpdateFormData({ ...updateFormData, age: e.target.value })} />
            <input type="email" placeholder="Email" value={updateFormData.email} onChange={e => setUpdateFormData({ ...updateFormData, email: e.target.value })} />
            <button onClick={handleUpdateUser}>Update</button>
          </div>
        )}
      </div>
  );
}

export default Home;