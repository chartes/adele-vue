
/*
  Change
 */

const getUser = function (user_id, included) {
  for (let item of included) {
    if (item.type === 'user' && item.id === user_id) {
      return { id: item.id, username: item.attributes.username };
    }
  }
  return null;
};


export  {

  /* user */
  getUser,
}
