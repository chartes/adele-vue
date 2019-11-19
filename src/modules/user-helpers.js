
/*
  User
 */

const getRoles = function (included) {
  return  included.filter(item => item.type === 'user_role').map(role => { return { id: role.id, ...role.attributes }});
};

const getUserRoles = function (users, included, u) {

  const roles = users.filter(_u => u.id === _u.id).map(_u => {
    return _u.relationships.roles.data
  });

  return included.filter(
      item => item.type === 'user_role' && roles.filter(r => r.id === item.id).length > 0
  ).map(role => {
    return {id: role.id, ...role.attributes}
  });
};


export  {

  /* user */
  getRoles,
  getUserRoles
}
