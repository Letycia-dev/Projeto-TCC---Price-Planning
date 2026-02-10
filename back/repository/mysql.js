import mysql from "mysql2/promise";

const pool = mysql.createPool({

    user: "root",
    password: "",
    // password: "etecembu@123",
    host: "localhost",
    port: 3306,
    database: "Price_Planning",
    waitForConnections: true,
    connectionLimit: 10, // limite de conexões simultâneas no pool
    queueLimit: 0,
    decimalNumbers: true, 
});

export default pool;