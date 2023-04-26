const makeId = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charLenght = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLenght));
  }

  //with while
  //let counter = 0;
  //while(counter < charLength) {
  // result += characters.charAt(Math.floor(Math.random() * charLenght));
  //counter++
  //}

  return result;
};

module.exports = {
  makeId,
};
