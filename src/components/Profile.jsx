import { useSession } from '../hooks/session-context';

// export const Profile = ({ session, logout }) => {
export const Profile = () => {
  const { session, logout } = useSession();
  return (
    <>
      <h3>Profile</h3>
      My name is <strong>{session.loginUser.name}</strong>
      <small>({session.loginUser.id})</small>.
      <button onClick={logout}>LOGOUT</button>
    </>
  );
};
