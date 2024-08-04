const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb://127.0.0.1:27017";
const dbname = "Task";

mongoClient.connect(connectionUrl, (error, res) => {
  if (error) {
    return console.log("error has occured");
  }
  console.log("All Perfect");
  const db = res.db(dbname);

  ///////////////////////////////////////////////////////////////////
  db.collection("users").insertOne(
    {
      name: "bavly",
      age: 25,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert bavly");
      } else console.log("you added bavly");
    }
  );

  db.collection("users").insertOne(
    {
      name: "islam",
      age: 29,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert islam");
      } else console.log("you added islam");
    }
  );

  // ////////////////////////////////////////////////////////////////////
  db.collection("users").insertMany(
    [
      {
        name: "akramy",
        age: 27,
      },
      {
        name: "alfy",
        age: 30,
      },
      {
        name: "mario",
        age: 34,
      },
      {
        name: "youssef",
        age: 27,
      },
      {
        name: "rawan",
        age: 55,
      },
      {
        name: "daved",
        age: 27,
      },
      {
        name: "mariam",
        age: 33,
      },
      {
        name: "tasnem",
        age: 27,
      },
      {
        name: "mahmoud",
        age: 20,
      },
      {
        name: "zezo",
        age: 27,
      },
    ],
    (error, data) => {
      if (error) {
        console.log("Unable to insert data");
      } else console.log(data.insertedCount);
    }
  );

  ////////////////////////////////////////////////////////////////////////////

  db.collection("users")
    .find({ age: 27 })
    .toArray((error, users) => {
      if (error) {
        console.log("Unable to find data");
      } else console.log(users);
    });

  db.collection("users")
    .find({ age: 27 })
    .limit(3)
    .toArray((error, users) => {
      if (error) {
        console.log("Unable to find data");
      } else console.log(users);
    });

  /////////////////////////////////////////////////////////////////////////

  const IncAgeFour = (iid) => {
    db.collection("users")
      .updateOne(
        { _id: iid },
        {
          $inc: { age: 4 },
        }
      )
      .then((data1) => {
        console.log(data1.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFirstFourAge = () => {
    db.collection("users")
      .find({ age: 27 })
      .limit(4)
      .toArray((error, users) => {
        if (error) {
          console.log("Unable to find data");
        } else {
          users.map((value) => {
            IncAgeFour(value._id);
          });
        }
      });
  };
  updateFirstFourAge();

  ///////////////////////////////////////////////////////////////////////////////////////

  const SetName = (iid) => {
    db.collection("users")
      .updateOne(
        { _id: iid },
        {
          $set: { name: "nesma" },
        }
      )
      .then((data1) => {
        console.log(data1.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFirstFourName = () => {
    db.collection("users")
      .find()
      .limit(4)
      .toArray((error, users) => {
        if (error) {
          console.log("Unable to find data");
        } else {
          users.map((value) => {
            SetName(value._id);
          });
        }
      });
  };
  updateFirstFourName();

  /////////////////////////////////////////////////////////////

  db.collection("users")
    .updateMany(
      {},
      {
        $inc: { age: 10 },
      }
    )
    .then((data1) => {
      console.log(data1.modifiedCount);
    })
    .catch((error) => {
      console.log(error);
    });

  ////////////////////////////////////////////////////////////////////

  db.collection("users")
    .deleteMany({ age: 41 })
    .then((data1) => {
      console.log(data1.deletedCount);
    })
    .catch((error) => {
      console.log(error);
    });
});
