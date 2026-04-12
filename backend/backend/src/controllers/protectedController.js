

const GetAdmin=(req, res) => {
  res.json({ message: "Welcome Admin" });
}

const GetProfessor=(req, res) => {
  res.json({ message: "Welcome Professor" });
}

const GetStudent=(req, res) => {
  res.json({ message: "Welcome Student" });
}

const GetCommon=(req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
}

export default {GetAdmin,GetProfessor,GetCommon,GetStudent};

