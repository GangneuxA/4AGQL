const fetch = require("node-fetch");
let accesstoken = "";
let refreshtoken = "";
let me = { email: "juju@juju.fr", password: "juju", pseudo: "juju" };
let grade = { student: "", course: "maths", grade: 15 };
describe(" Gade tests", () => {
  it("return all grade ", async () => {
    const query = `query GetGradeByCourse {
  getAllGrade {
    course
    grade
    id
    student
  }
}`;

    const response = await fetch("http://localhost:4002/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    });
    const responseData = await response.json();
    expect(responseData.data.getAllGrade.errors).toBeUndefined();
    expect(responseData.data.getAllGrade).toBeDefined();
  });
  it("create user ", async () => {
    const query = `mutation createUser($email: String, $pseudo: String, $password: String) {
  createuser(email: $email, pseudo: $pseudo, password: $password) {
    email
    id
    password
    pseudo
    role
  }
}`;
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query, variables: me }),
    });
    const responseData = await response.json();
    expect(responseData.data.createuser.errors).toBeUndefined();
    expect(responseData.data.createuser).toBeDefined();
    me = responseData.data.createuser;
    me.password = "juju";
    grade.student = me.id;
  });
  it("connection", async () => {
    const query = `mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    role
    accessToken
    refreshToken
  }
}`;

    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: query,
        variables: {
          email: me.email,
          password: me.password,
        },
      }),
    });
    const responseData = await response.json();
    console.log(responseData.data);
    expect(responseData.data.login.errors).toBeUndefined();
    expect(responseData.data.login).toBeDefined();
    accesstoken = responseData.data.login.accessToken;
    refreshtoken = responseData.data.login.refreshToken;
  });
  it("passe teacher", async () => {
    const query = `mutation Setteacher {
  setteacher {
    id
    email
    pseudo
    role
    password
  }
}`;

    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accesstoken,
        "x-refresh-token": refreshtoken,
      },
      body: JSON.stringify({ query: query }),
    });
    const responseData = await response.json();
    expect(responseData.data.setteacher.errors).toBeUndefined();
    expect(responseData.data.setteacher).toBeDefined();
  });
  it("connection teacher", async () => {
    const query = `mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    role
    accessToken
    refreshToken
  }
}`;

    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: query,
        variables: {
          email: me.email,
          password: me.password,
        },
      }),
    });
    const responseData = await response.json();
    console.log(responseData.data);
    expect(responseData.data.login.errors).toBeUndefined();
    expect(responseData.data.login).toBeDefined();
    accesstoken = responseData.data.login.accessToken;
    refreshtoken = responseData.data.login.refreshToken;
  });
  it("create grade", async () => {
    const query = `mutation CreateGrade($student: String, $course: String, $grade: Int) {
  createGrade(student: $student, course: $course, grade: $grade) {
    id
    student
    course
    grade
  }
}`;

    const response = await fetch("http://localhost:4002/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accesstoken,
        "x-refresh-token": refreshtoken,
      },
      credentials: "include",
      body: JSON.stringify({
        query: query,
        variables: grade,
      }),
    });
    const responseData = await response.json();
    console.log(responseData.data);
    expect(responseData.data.createGrade.errors).toBeUndefined();
    expect(responseData.data.createGrade).toBeDefined();
    grade = responseData.data.createGrade;
  });
  it("update grade", async () => {
    const query = `mutation UpdateGrade($grade: Int, $updateGradeId: ID) {
  updateGrade(grade: $grade, id: $updateGradeId) {
    id
    student
    course
    grade
  }
}`;

    const response = await fetch("http://localhost:4002/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accesstoken,
        "x-refresh-token": refreshtoken,
      },
      credentials: "include",
      body: JSON.stringify({
        query: query,
        variables: { updateGradeId: grade.id, grade: 10 },
      }),
    });
    const responseData = await response.json();
    expect(responseData.data.updateGrade.errors).toBeUndefined();
    expect(responseData.data.updateGrade).toBeDefined();
    grade = responseData.data.updateGrade;
  });
  it("delete grade", async () => {
    const query = `mutation DeleteGrade($deleteGradeId: ID) {
  deleteGrade(id: $deleteGradeId) {
    id
    student
    course
    grade
  }
}`;

    const response = await fetch("http://localhost:4002/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accesstoken,
        "x-refresh-token": refreshtoken,
      },
      credentials: "include",
      body: JSON.stringify({
        query: query,
        variables: { deleteGradeId: grade.id },
      }),
    });
    const responseData = await response.json();
    expect(responseData.data.deleteGrade.errors).toBeUndefined();
    expect(responseData.data.deleteGrade).toBeDefined();
  });

  it("delete user ", async () => {
    const query = `mutation Deleteuser {
  deleteuser {
    email
    id
    password
    pseudo
    role
  }
}`;

    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accesstoken,
        "x-refresh-token": refreshtoken,
      },
      body: JSON.stringify({ query: query }),
    });
    const responseData = await response.json();
    expect(responseData.data.deleteuser.errors).toBeUndefined();
    expect(responseData.data.deleteuser).toBeDefined();
  });
});
