Dev bypass mode

Purpose
- Allow local development access to all frontend pages without authenticating against the backend.

How it works
- When enabled, the app writes minimal user data into localStorage (user_id, user_name, user_email).
- Pages that check for `localStorage.getItem('user_id')` will behave as if a user is logged in.

How to enable
1. Create a file at the project root named `.env.local` (next.js reads this automatically).
2. Add the following line:

NEXT_PUBLIC_DEV_BYPASS=1

3. Make sure you're running Next.js in development mode (NODE_ENV=development). The bypass only runs in development.

Notes and safety
- This is strictly for local development. Do NOT enable in production.
- The code sets values only if they are not already present to avoid overwriting real test accounts.
- To disable, remove or set `NEXT_PUBLIC_DEV_BYPASS` to `0`.

Verification
- Start the dev server and open any protected page (e.g., `/dashboard` or `/tracker`). You should be allowed through without logging in.

If you want a different fake user, set the `user_id`, `user_name`, and `user_email` keys in localStorage manually (DevTools -> Application -> Local Storage) or update `_app.js` to use other defaults.
