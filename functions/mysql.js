const mysql_ = require("mysql");
const syncSql = require("sync-sql");
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  dateStrings: "date",
};
class mysql {
  SELECT(table) {
    let success = false;
    const key_and_value = [table];
    const sql = `SELECT * FROM ??`;
    const inserts = key_and_value;
    const sql_ = mysql_.format(sql, inserts);
    const data = syncSql.mysql(config, sql_);
    if (data.success) {
      success = true;
    } else {
      return { success, err: data.data.err.errno };
    }
    return { success, data: data.data.rows };
  }
  INSERT(values, table) {
    const key_and_value = [table];
    let keys = "";
    let value = "";
    let success = false;
    for (var property in values) {
      if (keys != "") {
        keys = keys.concat(`,`);
        value = value.concat(`,`);
      }
      keys = keys.concat(`??`);
      value = value.concat(`?`);
      key_and_value.push(property);
    }
    for (var property in values) {
      key_and_value.push(values[property]);
    }
    const sql = `INSERT INTO ?? (${keys}) VALUES (${value})`;
    const inserts = key_and_value;
    const sql_ = mysql_.format(sql, inserts);
    const data = syncSql.mysql(config, sql_);
    if (data.success) {
      success = true;
    } else {
      return { success, err: data.data.err.errno, query: sql_ };
    }
    return { success, data };
  }
  UPDATE(values, update_key, update_value, table) {
    let success = false;
    const key_and_value = [table];
    let sets = "";
    for (var property in values) {
      if (sets != "") {
        sets = sets.concat(`, `);
      }
      sets = sets.concat(`?? =  ? `);
      key_and_value.push(property);
      key_and_value.push(values[property]);
    }
    const sql = `UPDATE ?? SET ${sets}  WHERE (\`${update_key}\` = '${update_value}');
    `;
    const inserts = key_and_value;
    const sql_ = mysql_.format(sql, inserts);
    const data = syncSql.mysql(config, sql_);
    if (data.success) {
      success = true;
    } else {
      return { success, err: data.data.err.errno };
    }
    return { success };
  }
  DELETE(delete_key, delete_value, table) {
    let success = false;
    const sql = "DELETE FROM ?? WHERE (?? = ?);";
    const inserts = [table, delete_key, delete_value];
    const sql_ = mysql_.format(sql, inserts);
    const data = syncSql.mysql(config, sql_);
    if (data.success) {
      success = true;
    } else {
      return { success, err: data.data.err.errno };
    }
    return { success, data: data.data.rows };
  }
  QUERY(query_key, query_value) {
    let success = false;
    const sql_ = mysql_.format(query_key, query_value);
    const data = syncSql.mysql(config, sql_);
    if (data.success) {
      success = true;
    } else {
      return { success, err: data.data.err };
    }
    return { success, data: data.data.rows };
  }
  SELECT_WHERE(query_key, query_value, table) {
    let success = false;
    const key_and_value = [table, query_key, query_value];
    const sql = `SELECT * FROM ?? WHERE ??=?`;
    const inserts = key_and_value;
    const sql_ = mysql_.format(sql, inserts);
    const data = syncSql.mysql(config, sql_);
    if (data.success) {
      success = true;
    } else {
      return { success, err: data.data.err.errno };
    }
    return { success, data: data.data.rows };
  }
}
module.exports = new mysql();
