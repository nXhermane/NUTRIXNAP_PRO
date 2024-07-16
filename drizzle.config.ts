import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  schema: "./scripts/database/schema/*",
  out: "./scripts/database/migrations",
  dbCredentials:{
    url:"./scripts/database/dbfiles/patient.sqlite"
  }
});
