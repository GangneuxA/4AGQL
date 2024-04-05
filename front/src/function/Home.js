import React from 'react';
import { gql, useQuery,  } from '@apollo/client';
// import { useNavigate } from 'react-router-dom';

const GET_ALL_CLASSROOM = gql`
query Query {
  getAllClassroom {
    name
    id
    numberMax
    member
  }
}
`;

function Home() {
  const { data, loading, error } = useQuery(GET_ALL_CLASSROOM);

  // const history = useNavigate();
  
  // const routeChange = (id) =>{ 
  //   let path = `/user/`+id; 
  //   history(path);
  // }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <h1>Classroom Search</h1>
        <h1>Classroom List</h1>
        <ul>
          {data.getAllClassroom.map(classroom => (
            <li key={classroom.id}>
              <div>
                <span>ID: {classroom.id}</span><br />
                <span>Name: {classroom.name}</span><br />
                <span>NumberMax: {classroom.numberMax}</span><br />
              </div>
              {/* <button color="primary" className="px-4"
                onClick={() => routeChange(user.id)}>
                View
              </button> */}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Home;