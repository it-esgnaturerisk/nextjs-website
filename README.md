This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


### Eslint 
We have eslint on the project, before a push it's recommended to run 
```bash
eslint .
```
and then
```bash
eslint --fix .
```
to fix what it detects automatically. Some errors might remain, resolve these manually before pushing the code.
You might also want to stage changes before fixing, so you can see what the linter has adjusted.

### Database updates
Update database by modifying lib->db->schema.ts, once changes are made run npx drizzle-kit generate, then npx drizzle-kit migrate.