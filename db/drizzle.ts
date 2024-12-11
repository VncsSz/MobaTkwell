import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema"

const sql = neon("postgresql://thinkwell_owner:4WYyXNQsJfO0@ep-young-lake-a5jfsqhv.us-east-2.aws.neon.tech/thinkwell?sslmode=require")
const db = drizzle(sql, { schema })

export default db;