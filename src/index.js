import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import SongUpload from "./pages/SongUpload";
import Chatroom from "./pages/Chatroom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Playlist from "./pages/Playlist";

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="SongUpload" element={<SongUpload />} />
          <Route path="SongUpload" element={<SongUpload />} />
          <Route path="Playlist" element={<Playlist />} />
          <Route path="Chatroom" element={<Chatroom />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));