const my = require('mysql2');
const mysql = require('mysql2/promise');
const sqls = require('../sqls.json');
require('dotenv').config();

const DB_INFO = {
  host: 'mydb1.c85blf5gqirg.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  user: 'lnsol',
  password: process.env.DB_PASSWD,
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 2,
  maxIdle: 2,
};

// const POOL = mysql.createPool(DB_INFO);

module.exports = {
  async getConn() {
    return mysql.createConnection(DB_INFO);
    // return POOL.getConnection();
  },

  getConnection() {
    return my.createConnection(DB_INFO);
  },

  async execute(sql, params) {
    let conn;
    try {
      conn = await this.getConn();
      const data = await conn.execute(sql, params);
      conn.end();
      return data;
    } catch (error) {
      console.log('Error on db.execute>>', error.message);
      console.error('-> SQL:', sql, params);
      throw error;
    }
  },

  async findNutritions({ food_name, research_year, maker_name, food_code }) {
    const filters = [];
    const params = [];
    if (food_code) {
      filters.push('n.food_cd = ?');
      params.push(food_code);
    }

    if (research_year) {
      filters.push('n.research_year = ?');
      params.push(research_year);
    }

    if (food_name) {
      filters.push(`n.food_name like concat('%', ?, '%')`);
      params.push(food_name);
    }

    if (maker_name) {
      filters.push(`m.name like concat('%', ?, '%')`);
      params.push(maker_name);
    }

    const where = filters.join(' and ');
    console.log('🚀  where:', where);

    const [data] = await this.execute(
      `${sqls.Nutrition.find} where ${where}`,
      params
    );
    console.log('🚀  rows:', data);
    return data;
  },

  insertBulk(sql, params, fn) {
    this.getConnection().query(sql, [params], fn);
  },

  insertSelect(table, params) {
    const {
      insert = `insert ignore into ${table}(name) values ?`,
      selectMap = `select name, id from ${table}`,
    } = sqls[table] || {};
    return new Promise((resolve, reject) => {
      this.insertBulk(insert, params, (err, rows) => {
        if (err) {
          console.error('Error.insert>>', err.message);
          // console.error(' - SQL>>', insert);
          // console.error(' - Params>>', params);
          reject(err);
        }
        // console.log('🚀  insRet:', rows);

        this.getConnection().query(selectMap, (err, rows) => {
          if (err) {
            console.error('Error.select>>', err.message);
            reject(err);
          }
          const map = new Map(rows.map(row => Object.values(row)));
          resolve(map);
        });
      });
    });
  },

  async get(table = 'Emp', id = 0) {
    const [[data]] = await this.execute(
      `select * from ${table} where id = ${id}`
    );
    return data;
  },

  async gets(table, limit = 100) {
    const [data] = await this.execute(`select * from ${table} limit ${limit}`);
    return data;
  },

  // async get(table = 'Emp', id = 0) {
  //   try {
  //     const conn = await this.getConn();
  //     const [[data]] = await conn.execute(
  //       `select * from ${table} where id = ${id}`
  //     );
  //     // console.log('🚀  rows:', data);
  //     return data;
  //   } catch (error) {
  //     console.error('Error on db.get>>', error.message);
  //     throw error;
  //   }
  // },

  // async gets(table, limit = 100) {
  //   try {
  //     const conn = await this.getConn();
  //     const [data] = await conn.execute(
  //       `select * from ${table} limit ${limit}`
  //     );
  //     // console.log('🚀  rows:', data);
  //     return data;
  //   } catch (error) {
  //     console.error('Error on db.gets>>', error.message);
  //     throw error;
  //   }
  // },

  async finds(table, searchParam) {
    const where = Object.entries(searchParam)
      .map(([k, v]) => `${k} = ${v}`)
      .join(' and ');
    console.log('🚀  where:', where);

    const [data] = await this.execute(`select * from ${table} where ${where}`);
    // console.log('🚀  rows:', data);
    return data;
  },

  getDbInfo() {
    return DB_INFO;
  },
};
