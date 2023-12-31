const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

const scooterApp = new ScooterApp();
// ScooterApp tests here

// register user

describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });

  test("Should properly record user into Regsitered Users", ()=>{
    let user = scooterApp.registerUser("Milo", "meow", 100);
    expect(scooterApp.registeredUsers["Milo"]).toEqual(user);
  });

  test("Throws an error if user is already registered", ()=>{
    expect(()=>{
      scooterApp.registerUser("Milo", "meow", 100).toThrow("already registered");
    })
  });

  test("Throws an error if user is underage", ()=>{
    expect(()=>{
      scooterApp.registerUser("Milo", "meow", 2).toThrow("too young to register");
    })
  })
});



describe("login User", ()=>{
  let user;
  user = scooterApp.registerUser("Shami", "milo", 28);

  test("Should login a user", ()=>{
    expect(user).toBeInstanceOf(User);
    expect(user.loggedIn).toBe(false);

    scooterApp.loginUser("Shami", "milo");
    expect(user.loggedIn).toBe(true);
  });

  test("Should throw an error if either credential is wrong", ()=>{
    expect(()=>{
      console.log(scooterApp.registeredUsers)
      scooterApp.loginUser("Shami", "Moli").toThrow("Username or password is incorrect");
    })
    expect(()=>{
      console.log(scooterApp.registeredUsers)
      scooterApp.loginUser("Shamooo", "milo").toThrow("Username or password is incorrect");
    })
  });
});

describe("logout User", ()=>{
  let user;
  user = scooterApp.registerUser("Sherman", "milo", 28);

  test("locates the registered user and calls its logout method", ()=>{
    user.login("milo");
    expect(user.loggedIn).toBe(true);

    scooterApp.logoutUser("Sherman");
    expect(user.loggedIn).toBe(false);
  });

  test("throws an error if user does not exist", ()=>{
    expect(()=>{
      scooterApp.logoutUser("Shami").toThrow("no such user is logged in")
    })
  })
});

describe("create scooter", ()=>{
  test("successfully creates a new scooter",()=>{
    let scoot = scooterApp.createScooter("central");
    expect(scoot).toBeInstanceOf(Scooter);
    expect(scoot.station).toBe("central");
  })

  test("throws an error if station does not exist", ()=>{
    expect(()=>{
      scooterApp.createScooter("nowhere").toThrow("no such station error");
    })
  })
 
})

describe("rentScooter", ()=>{
  let user = scooterApp.registerUser("Shoma", "milo", 28);
  test("locates given scooter at one of the station, removes it, and rents it to a user",()=>{
    let scoot = scooterApp.createScooter("central");
    scooterApp.rentScooter(scoot, user);
    expect(scooterApp.stations["central"].includes(scoot)).toBe(false);
    expect(scoot.user).toBe(user);
    expect(scoot.station).toBe(null);
  });

  test("throws an error if scooter already rented", ()=>{
    let scoot = scooterApp.createScooter("central");
    scoot.user = user; 
    scoot.station = null;
    expect(()=>{
      scooterApp.rentScooter(scoot, user).toThrow("scooter already rented");
    })
   
  })
})

describe("dockScooter", ()=>{
  test("locates a scooter and docks it",()=>{
    let user = scooterApp.registerUser("Shma", "milo", 28);
    let scoot = scooterApp.createScooter("central");
    scooterApp.rentScooter(scoot, user);
    expect(scoot.station).toBe(null);

    scooterApp.dockScooter(scoot, "central");
    expect(scoot.station).toBe("central");
    expect(scoot.user).toBe(null);
  });

  test("throws an error if station does not exist", ()=>{
    let scoot = scooterApp.createScooter("central");

    expect(scoot).toBeInstanceOf(Scooter);
    expect(()=>{
      scooterApp.dockScooter(scoot, "nowhere").toThrow("station does not exist")
    })
  })
})

