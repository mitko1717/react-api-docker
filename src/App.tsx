import { useAppSelector } from "./hooks/redux";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddFilm from "./components/AddFilm";
import Movies from "./components/Movies";
import { Toaster } from "react-hot-toast";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function App() {
  const { isAuthedSession, isAuthedUser } = useAppSelector(
    (state) => state.data
  );

  return (
    <div className="w-full h-[100vh] bg-slate-700 p-4 relative">
      <Toaster />
      {!isAuthedUser && <Signup />}
      {!isAuthedSession && isAuthedUser && <Login />}
      {isAuthedUser && isAuthedSession && (
        <>
          <a
            href="movies.txt"
            className="absolute top-1 right-1 shadow-xl bg-slate-600 rounded-xl p-1 px-2"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
            Download Movies List
          </a>
          <AddFilm />
          <Movies />
        </>
      )}
    </div>
  );
}

export default App;
