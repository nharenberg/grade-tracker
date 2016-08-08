const squel = require("squel").useFlavour("mysql");
const uuid = require("uuid");
const connection = require("./connectdb");

connection.query(`create table if not exists grades (
  id varchar(50),
  name varchar(200),
  total int,
  score int,
  grade varchar(5)

  )`, err => {
    if (err) {
      console.log(`TABLE CREATION ERROR:`, err);
    }
  });

exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from("grades").toString()

      connection.query(sql, (err, grades) => {
        if(err) {
          reject(err)
        } else {
          resolve(grades);
        }
      });
  });
};

exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert()
                    .into('grades')
                    .set("id", uuid())
                    .toString();
    connection.query(sql, (err, grades) => {
      let grade = grades[0];
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.delete = function(id) {
  return new Promise((resolve, reject) => {

    let sql = squel.delete()
                    .from("grades")
                    .where("id = ?", id)
                    .toString();
    connection.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.create = function(newGrade) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert()
                    .into("grades")
                    .setFields(newGrade)
                    .set("id", uuid())
                    .toString();
    connection.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.update = function(id, updateObj) {
  return new Promise((resolve, reject) => {
    delete updateObj.id;
    let sql = squel.update()
                    .table("grades")
                    .setFields(updateObj)
                    .where("id = ?", id)
                    .toString();
    connection.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};