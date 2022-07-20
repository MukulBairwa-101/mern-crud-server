const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  let users;
  try {
    users = await usermodel.find({});
    // res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
  res.status(201).send({
    status: true,
    users: users,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  let user;
  try {
    user = await usermodel.findOne({ _id: id });
  } catch (err) {
    res.status(500).send(err);
  }

  res.status(201).send({
    status: true,
    user: user,
  });
};

const createUser = async (req, res) => {
  const { firstname, lastname, email, password,age, address } = req.body;
  console.log(req.body);
  // try {
  //     const user = await usermodel.create({firstname,lastname,email,password});
  //     console.log(user)
  //     res.json(user);
  // }
  // catch(error){
  //     // console.log(error)
  //     res.send(error);
  // }

  const user = new usermodel({
    firstname,
    lastname,
    email,
    password,
    age,
    address,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  let userData;

  try {
    userData = await user.save();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  res.status(201).send({
    status: true,
    users: userData,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const { firstname, lastname, email, password ,age, address} = req.body;
  console.log(req.body);
  let updateUser;
  try {
    updateUser = await usermodel.findOne({"_id":id})
    console.log(updateUser,"hey here i am");

    const checkUserUpdate = async() => {
      if (firstname) updateUser.firstname = firstname;
      if (lastname) updateUser.lastname = lastname;
      if (email) updateUser.email = email;
      if (age) updateUser.age = age;
      if (address) updateUser.address = address;
      if (password) {
        const salt =await bcrypt.genSalt(10);
        updateUser.password = await bcrypt.hash(password, salt);
        
      }
  
      return updateUser;
    };

    let updateResponse = checkUserUpdate();
    if (updateResponse) {
      await usermodel.findByIdAndUpdate(id, {
        $set: {
          updateUser,
        },
      });
    }



    res.send("user updated");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  await updateUser.save();
};

const deleteUser =async (req, res) => {
    const {id} = req.params;
    console.log(id);
    let users;
    try{
      users = await usermodel.findByIdAndDelete(id)
      // console.log(users)
      res.status(201).send("user deleted");
    }
    catch(err){
      res.status(500).send(err);
    }

    
    
    


};

module.exports = { getUsers, getUser, updateUser, deleteUser, createUser };
