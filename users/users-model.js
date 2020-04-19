const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

// used to have password as 3rd item being sent back in .select
// but we don't want that, or else we're exposing the password
function findById(id) {
  return db("users")
    .where({ id })
    .select('id', 'username')
    .first();
}
