import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from '@neondatabase/serverless';
 
export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  return {
    adapter: PostgresAdapter(pool),
    providers: [GitHub],
  }
})
