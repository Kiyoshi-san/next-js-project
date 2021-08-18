import Link from 'next/link';
import classes from './MainNavigation.module.scss';
import {
  signIn,
  SignInEventMessage,
  signOut,
  useSession,
} from "next-auth/client";

function MainNavigation() {
  const [session, loading] = useSession();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          {!session && (
            <li>
              <button onClick={() => signIn("auth0")}>Sign in</button>
            </li>
          )}
          {session && (
            <li>
              Signed in as {session.user.email}
              <button onClick={() => signOut()}>Sign out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
