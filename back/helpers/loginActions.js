import jwt from "jsonwebtoken"

function generatePassword() {

  const key = (Math.random() + 1).toString(36).substring(2).substring(0, 10);
  const newPassword = key.replace("n", "@").replace("w", "!").replace("i", "#").replace("t", "$").replace("a", "*").replace("r", "%");

  return newPassword;
}

function generatedToken(id_login, user_name) {

  const SECRET = process.env.SECRET;
  return jwt.sign({ infoUser: { id_login, userName: user_name } }, SECRET, { expiresIn: 60 * 60 * 5 });
}

export { generatePassword, generatedToken };