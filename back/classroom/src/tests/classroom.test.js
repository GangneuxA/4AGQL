const fetch = require("node-fetch");
let accesstoken = "";
let refreshtoken = "";
let me = { email: "alexis@alexis.fr", password: "alexis", pseudo: "alexis" };
let classroom = { name: "4E", numberMax: 20 };


describe(" Classroom tests", () => {

    it("return all classroom", async () => {
        const query = `
            query GetClassroom {
                getAllClassroom {
                    member
                    name
                    numberMax
                    id
                }
            }
        `;

        const response = await fetch("http://localhost:4001/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query }),
        });
        const responseData = await response.json();
        expect(responseData.data.getAllClassroom.errors).toBeUndefined();
        expect(responseData.data.getAllClassroom).toBeDefined();
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
        me.password = "alexis";
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

    it("create classroom", async () => {
        const query = `
        mutation Mutation($name: String, $numberMax: Int) {
            createClassroom(name: $name, numberMax: $numberMax) {
              name
              id
              member
              numberMax
            }
          }
          
        `;

        const response = await fetch("http://localhost:4001/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": accesstoken,
            "x-refresh-token": refreshtoken,
        },
        credentials: "include",
        body: JSON.stringify({
            query: query,
            variables: classroom,
        }),
        });
        const responseData = await response.json();
        console.log(responseData.data);
        expect(responseData.data.createClassroom.errors).toBeUndefined();
        expect(responseData.data.createClassroom).toBeDefined();
        classroom = responseData.data.createClassroom;
  
    });

    it("update classroom", async () => {
        const query = `
        mutation Mutation($updateClassroomId: ID, $name: String, $numberMax: Int) {
            updateClassroom(id: $updateClassroomId, name: $name, numberMax: $numberMax) {
              id
              member
              name
              numberMax
            }
          }
          
        `;
        const response = await fetch("http://localhost:4001/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": accesstoken,
            "x-refresh-token": refreshtoken,
        },
        credentials: "include",
        body: JSON.stringify({
            query: query,
            variables: { updateClassroomId: classroom.id, name: "6E", numberMax: 10 },
        }),
        });
        const responseData = await response.json();
        expect(responseData.data.updateClassroom.errors).toBeUndefined();
        expect(responseData.data.updateClassroom).toBeDefined();
        classroom = responseData.data.updateClassroom;
    })

    it("add member", async () => {
        const query = `
        mutation Mutation($addMemberId: ID, $member: String) {
            addMember(id: $addMemberId, member: $member) {
              id
              member
              name
              numberMax
            }
          }
          
          
        `;

        const response = await fetch("http://localhost:4001/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": accesstoken,
            "x-refresh-token": refreshtoken,
        },
        credentials: "include",
        body: JSON.stringify({
            query: query,
            variables: {addMemberId: classroom.id, member: me.id},
        }),
        });
        const responseData = await response.json();
        console.log(responseData.data);
        expect(responseData.data.addMember.errors).toBeUndefined();
        expect(responseData.data.addMember).toBeDefined();
    });

    it("delete member", async () => {
        const query = `
        mutation Mutation($deleteMemberId: ID, $member: String) {
            deleteMember(id: $deleteMemberId, member: $member) {
              id
              member
              numberMax
              name
            }
          }
          
        `;
        const response = await fetch("http://localhost:4001/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": accesstoken,
            "x-refresh-token": refreshtoken,
        },
        credentials: "include",
        body: JSON.stringify({
            query: query,
            variables: { deleteMemberId: classroom.id, member: me.id },
        }),
        });
        const responseData = await response.json();
        expect(responseData.data.deleteMember.errors).toBeUndefined();
        expect(responseData.data.deleteMember).toBeDefined();
    });

    it("return classroom by name", async () => {
        const query = `
        query Query($name: String) {
            getClassroom(name: $name) {
              id
              member
              name
              numberMax
            }
          }
        `;

        const response = await fetch("http://localhost:4001/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query , variables: {name: classroom.name}}),
        });
        const responseData = await response.json();
        expect(responseData.data.getClassroom.errors).toBeUndefined();
        expect(responseData.data.getClassroom).toBeDefined();
    });

    it("delete classroom", async () => {
        const query = `
        mutation Mutation($deleteClassroomId: ID) {
            deleteClassroom(id: $deleteClassroomId) {
              id
              member
              name
              numberMax
            }
          }
          
        `;
        const response = await fetch("http://localhost:4001/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": accesstoken,
            "x-refresh-token": refreshtoken,
        },
        credentials: "include",
        body: JSON.stringify({
            query: query,
            variables: { deleteClassroomId: classroom.id },
        }),
        });
        const responseData = await response.json();
        expect(responseData.data.deleteClassroom.errors).toBeUndefined();
        expect(responseData.data.deleteClassroom).toBeDefined();
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