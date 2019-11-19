const getPersons = function (included) {

    const hasRoleById = {};
    const rolesById = {};
    const personsById = {};
    included.forEach(inc => {
      if (inc.type === 'person') {
        personsById[inc.id] = {...inc.attributes}
      } else if (inc.type === 'person-role') {
        rolesById[inc.id] = {...inc.attributes}
      } else if (inc.type === 'person-has-role') {
        hasRoleById[inc.id] = {
          relationId: inc.id,
          roleId: inc.relationships['person-role'].data.id,
          personId: inc.relationships.person.data.id,
        }
      }
    });
    return Object.values(hasRoleById).map(hasRole => { return {
      ...hasRole, person: personsById[hasRole.personId],
      role: rolesById[hasRole.roleId],
      relationId: hasRole.relationId
    }})

  },

  getPlacenames = function (included) {
      const hasRoleById = {};
      const rolesById = {};
      const placenamesById = {};
      included.forEach(inc => {
          if (inc.type === 'placename') {
              placenamesById[inc.id] = {...inc.attributes}
          } else if (inc.type === 'placename-role') {
              rolesById[inc.id] = {...inc.attributes}
          } else if (inc.type === 'placename-has-role') {
              hasRoleById[inc.id] = {
                  relationId: inc.id,
                  roleId: inc.relationships['placename-role'].data.id,
                  placenameId: inc.relationships.placename.data.id,
              }
          }
      });
      return Object.values(hasRoleById).map(hasRole => {
          return {
              ...hasRole, placename: placenamesById[hasRole.placenameId],
              role: rolesById[hasRole.roleId],
              relationId: hasRole.relationId
          }
      })

  },

  getInstitution = function (included) {
    return getSimpleRelation('institution', included)
  },

  getLanguages = function (included) {
    return  included.filter(item => item.type === 'language').map(lang => { return { id: lang.id, ...lang.attributes }});
  },

  getWitnesses = function (included) {
      return included.filter(item => item.type === 'witness')
        .map(wit => {
            return {id: wit.id, ...wit.attributes}
        })
        .sort((a, b) => (a.num > b.num) ? 1 : ((b.num > a.num) ? -1 : 0));
  },

  getCollections = function (included) {
    return  included.filter(item => item.type === 'collection').map(collection => { return { id: collection.id, ...collection.attributes }});
  },

  getNotes = function (included) {
    return  included.filter(item => item.type === 'note').map(lang => { return { id: lang.id, ...lang.attributes }});
  },

  getCurrentLock = function (included) {
    return  getSimpleRelation('lock', included)
  },

  getSimpleRelation = function (propName, included) {
    let found = included.find(item => item.type === propName);
    return found ? { id: found.id, ...found.attributes} : {id: null}
  },

  getIncludedRelation = function (data, included, relName) {
    return data.relationships[relName].data.map(r => {
        let found = included.find(item => item.type === r.type && item.id === r.id);
        return found ? {id: found.id, ...found.attributes} : null;
    })
  },

  removeContentEditableAttributesFromString = function (str) {
    return str.replace(/ contenteditable="false"/mgi, '')
  },
  removeContentEditableAttributesFromObject = function (attributesObject) {
    if (!attributesObject) return;
    Object.keys(attributesObject).forEach(k => {
      if (typeof attributesObject[k] === 'string') {
        attributesObject[k] = removeContentEditableAttributesFromString(attributesObject[k])
      }
    })
  }


export  {
  /* document */
  getPersons,
  getPlacenames,
  getInstitution,
  getLanguages,
  getWitnesses,
  getNotes,
  getCollections,
  getCurrentLock,

  getIncludedRelation,

  removeContentEditableAttributesFromString,
  removeContentEditableAttributesFromObject
}
