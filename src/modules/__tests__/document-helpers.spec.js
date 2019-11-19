import {getPersons, getInstitution, getLanguages, getTradition} from '../document-helpers'

const includedIn = [
  {
    "type": "person",
    "id": 10,
    "attributes": {
      "firstname": "Diane",
      "lastname": "Smith",
      "key": "Angel Edwards",
      "ref": "http://rodriguez.com/app/index.jsp"
    },
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/10"
    },
    "relationships": {
      "roles-within-documents": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/10/relationships/roles-within-documents",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons/10/roles-within-documents"
        },
        "data": [
          {
            "id": 6,
            "type": "person-has-role"
          }
        ]
      },
      "documents": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/10/relationships/documents",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons/10/documents"
        },
        "data": [
          {
            "id": 9,
            "type": "document"
          }
        ]
      }
    }
  },
  {
    "type": "person",
    "id": 5,
    "attributes": {
      "firstname": "Carlos",
      "lastname": "Watson",
      "key": "Amanda Francis",
      "ref": "http://www.mclaughlin.com/wp-content/home/"
    },
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/5"
    },
    "relationships": {
      "roles-within-documents": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/5/relationships/roles-within-documents",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons/5/roles-within-documents"
        },
        "data": [
          {
            "id": 7,
            "type": "person-has-role"
          },
          {
            "id": 9,
            "type": "person-has-role"
          },
          {
            "id": 14,
            "type": "person-has-role"
          },
          {
            "id": 20,
            "type": "person-has-role"
          }
        ]
      },
      "documents": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/5/relationships/documents",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons/5/documents"
        },
        "data": [
          {
            "id": 9,
            "type": "document"
          },
          {
            "id": 11,
            "type": "document"
          },
          {
            "id": 13,
            "type": "document"
          },
          {
            "id": 20,
            "type": "document"
          }
        ]
      }
    }
  },
  {
    "type": "person",
    "id": 4,
    "attributes": {
      "firstname": "James",
      "lastname": "Taylor",
      "key": "Erin Carter",
      "ref": null
    },
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/4"
    },
    "relationships": {
      "roles-within-documents": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/4/relationships/roles-within-documents",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons/4/roles-within-documents"
        },
        "data": [
          {
            "id": 8,
            "type": "person-has-role"
          }
        ]
      },
      "documents": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons/4/relationships/documents",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons/4/documents"
        },
        "data": [
          {
            "id": 9,
            "type": "document"
          }
        ]
      }
    }
  },
  {
    "type": "person-role",
    "id": 12,
    "attributes": {
      "id": 12,
      "label": "add",
      "description": null
    },
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/person-roles/12"
    },
    "relationships": {}
  },
  {
    "type": "person-role",
    "id": 8,
    "attributes": {
      "id": 8,
      "label": "democratic",
      "description": null
    },
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/person-roles/8"
    },
    "relationships": {}
  },
  {
    "type": "person-role",
    "id": 9,
    "attributes": {
      "id": 9,
      "label": "mention",
      "description": null
    },
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/person-roles/9"
    },
    "relationships": {}
  },
  {
    "type": "person-has-role",
    "id": 6,
    "attributes": {},
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/6"
    },
    "relationships": {
      "person-role": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/6/relationships/person-role",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/6/person-role"
        },
        "data": {
          "id": 12,
          "type": "person-role"
        }
      },
      "document": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/6/relationships/document",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/6/document"
        },
        "data": {
          "id": 9,
          "type": "document"
        }
      },
      "person": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/6/relationships/person",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/6/person"
        },
        "data": {
          "id": 10,
          "type": "person"
        }
      }
    }
  },
  {
    "type": "person-has-role",
    "id": 7,
    "attributes": {},
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/7"
    },
    "relationships": {
      "person-role": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/7/relationships/person-role",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/7/person-role"
        },
        "data": {
          "id": 8,
          "type": "person-role"
        }
      },
      "document": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/7/relationships/document",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/7/document"
        },
        "data": {
          "id": 9,
          "type": "document"
        }
      },
      "person": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/7/relationships/person",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/7/person"
        },
        "data": {
          "id": 5,
          "type": "person"
        }
      }
    }
  },
  {
    "type": "person-has-role",
    "id": 8,
    "attributes": {},
    "meta": {},
    "links": {
      "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/8"
    },
    "relationships": {
      "person-role": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/8/relationships/person-role",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/8/person-role"
        },
        "data": {
          "id": 9,
          "type": "person-role"
        }
      },
      "document": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/8/relationships/document",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/8/document"
        },
        "data": {
          "id": 9,
          "type": "document"
        }
      },
      "person": {
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/8/relationships/person",
          "related": "http://0.0.0.0:5004/lettres/api/1.0/persons-having-roles/8/person"
        },
        "data": {
          "id": 4,
          "type": "person"
        }
      }
    }
  }
]

const resultOk = [
  {
    relationId: 6,
    roleId: 12,
    personId: 10,
    person: {
      "firstname": "Diane",
      "lastname": "Smith",
      "key": "Angel Edwards",
      "ref": "http://rodriguez.com/app/index.jsp"
    },
    role: {
      "id": 12,
      "label": "add",
      "description": null
    }
  },
  {
    relationId: 7,
    roleId: 8,
    personId: 5,
    person: {
      "firstname": "Carlos",
      "lastname": "Watson",
      "key": "Amanda Francis",
      "ref": "http://www.mclaughlin.com/wp-content/home/"
    },
    role: {
      "id": 8,
      "label": "democratic",
      "description": null
    }
  },
  {
    relationId: 8,
    roleId: 9,
    personId: 4,
    person: {
      "firstname": "James",
      "lastname": "Taylor",
      "key": "Erin Carter",
      "ref": null
    },
    role: {
      "id": 9,
      "label": "mention",
      "description": null
    },
  }
]

describe('Persons helpers', () => {

  test('getPersons', () => {
    expect(getPersons(includedIn)).toEqual(resultOk)
  })

  test('getInstitution', () => {

    const incIn = [
      {
        "type": "institution",
        "id": 11,
        "attributes": {
          "name": "Marriage parent share.",
          "ref": "https://kelley.biz/posts/wp-content/author.html"
        },
        "meta": {},
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/institutions/11"
        },
        "relationships": {
          "documents": {
            "links": {
              "self": "http://0.0.0.0:5004/lettres/api/1.0/institutions/11/relationships/documents",
              "related": "http://0.0.0.0:5004/lettres/api/1.0/institutions/11/documents"
            },
            "data": [
              {
                "id": 9,
                "type": "document"
              }
            ]
          }
        }
      }
    ]

    expect(getInstitution(incIn)).toEqual({ "id": 11, "name": "Marriage parent share.", "ref": "https://kelley.biz/posts/wp-content/author.html" })
  })
  
  test('getLanguages', () => {

    const incIn = [
      {
        "type": "language",
        "id": 4,
        "attributes": {
          "code": "CZC",
          "label": null
        },
        "meta": {},
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/languages/4"
        },
        "relationships": {
          "documents": {
            "links": {
              "self": "http://0.0.0.0:5004/lettres/api/1.0/languages/4/relationships/documents",
              "related": "http://0.0.0.0:5004/lettres/api/1.0/languages/4/documents"
            },
            "data": [
              {
                "id": 2,
                "type": "document"
              },
              {
                "id": 9,
                "type": "document"
              },
              {
                "id": 17,
                "type": "document"
              },
              {
                "id": 18,
                "type": "document"
              },
              {
                "id": 1,
                "type": "document"
              }
            ]
          }
        }
      },
      {
        "type": "language",
        "id": 5,
        "attributes": {
          "code": "ITA",
          "label": null
        },
        "meta": {},
        "links": {
          "self": "http://0.0.0.0:5004/lettres/api/1.0/languages/5"
        },
        "relationships": {
          "documents": {
            "links": {
              "self": "http://0.0.0.0:5004/lettres/api/1.0/languages/5/relationships/documents",
              "related": "http://0.0.0.0:5004/lettres/api/1.0/languages/5/documents"
            },
            "data": [
              {
                "id": 1,
                "type": "document"
              },
              {
                "id": 3,
                "type": "document"
              },
              {
                "id": 6,
                "type": "document"
              },
              {
                "id": 10,
                "type": "document"
              },
              {
                "id": 11,
                "type": "document"
              },
              {
                "id": 13,
                "type": "document"
              },
              {
                "id": 14,
                "type": "document"
              },
              {
                "id": 16,
                "type": "document"
              }
            ]
          }
        }
      }
    ], ok = [
      {"id": 4, "code": "CZC", "label": null },
      {"id": 5, "code": "ITA", "label": null }
    ]

    expect(getLanguages(incIn)).toEqual(ok)
  })

})
