const neo4j = require('node-neo4j');
const db = new neo4j('http://username:password@localhost:7474');

const getJson =  async () => {
  return new Promise((resolve, reject) => {
    //查询语句
    var sql_root = "Match(n:Admin) return n";
    var sql_child = "Match(n:Children) return n";
    var json = {}
    //根节点
    db.cypherQuery(sql_root, function (err, result) {
      if (err){
        throw err;
      }
      json.name = result.data[0].name;
    });

    //子节点
    db.cypherQuery(sql_child, function (err, result) {
      if (err){
        throw err;
      }
      var children = [];
      for (var i = 0; i < result.data.length; i++) {
        children[i] = {name: result.data[i].name}
      }
      json.children = children;
      resolve(json);
    });
  }) 
}

module.exports = {
  getJson
}