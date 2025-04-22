import mysql from "mysql2/promise";
import { env } from "../env";

export const db = mysql.createPool(env.MYSQL_URL);
