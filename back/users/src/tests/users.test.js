const fetch = require("node-fetch");
let accesstoken = "";
let refreshtoken = "";
let me = { email: "juju@juju.fr", password: "juju", pseudo: "juju" };
let update = { email: "juju@juju.fr", password: "jaja", pseudo: "jaja" };
describe(" Users tests", () => {
  it("return all user ", async () => {
    const query = `query Getuser {
                    getusers {
                        id
                        email
                        pseudo
                        role
                        password
                    }
                }`;

    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    });
    const responseData = await response.json();
    expect(responseData.data.getusers.errors).toBeUndefined();
    expect(responseData.data.getusers).toBeDefined();
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
  });
  it("connection", async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
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
  it("update user ", async () => {
    const query = `mutation Mutation($password: String, $email: String, $pseudo: String) {
  updateuser(password: $password, email: $email, pseudo: $pseudo) {
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
      body: JSON.stringify({ query: query, variables: update }),
    });
    const responseData = await response.json();
    expect(responseData.data.updateuser.errors).toBeUndefined();
    expect(responseData.data.updateuser).toBeDefined();
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
