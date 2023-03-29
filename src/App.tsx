import { useAppSelector } from "./hooks/redux";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddFilm from "./components/AddFilm";
import Movies from "./components/Movies";

function App() {
  const { isAuthedSession, isAuthedUser } = useAppSelector(
    (state) => state.data
  );

  return (
    <div className="w-full h-[100vh] bg-slate-700 p-4">
      {/* {!isAuthedUser && <Signup />} */}
      {!isAuthedSession && !isAuthedUser && <Login />}
      {!isAuthedUser && isAuthedSession && (
        <>
          <AddFilm />
          <Movies />
        </>
      )}
    </div>
  );
}

export default App;
