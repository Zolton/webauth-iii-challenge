exports.seed = function(knex) {
  // Deletes ALL existing entries
  // import, run over password, set password as hash
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "admin", password: "admin", department: "sales" },
        { username: "test1", password: "test1", department: "sales" },
        { username: "testTweo", password: "testTweop", department: "sales" },
        {
          username: "superadmin",
          password: "superadmin",
          department: "finance"
        },
        {
          username: "superadmin212",
          password: "superadmin44",
          department: "finance"
        },
        {
          username: "testagain",
          password: "no imagination",
          department: "finance"
        }
      ]);
    });
};
