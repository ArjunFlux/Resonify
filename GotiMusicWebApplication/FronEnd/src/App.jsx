import React from "react";
import NavBar from "./Components/NavBar";
import HeroSection from "./Components/HeroSection";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import Login from "./Components/Login";
import ForgetPassword from "./Components/ForgetPassword";
import VerifiyTheCodeAndChangePassword from "./Components/VerifiyTheCodeAndChangePassword";
import HomePage from "./Components/HomePage";
import PopularSongs from "./Pages/PopularSongs";
import ArtistPage from "./Components/ArtistPage";
import AddYourMusic from "./Components/AddYourMusic";
import ExplorePage from "./Components/ExplorePage";
import PlaylistSongs from "./Pages/PlaylistSongs";
import CustomPlaylist from "./Pages/CustomPlaylist";
import PlaylistForCustomUser from "./Pages/PlaylistForCustomUser";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <HeroSection />
            </>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          path="/verifiyandchange"
          element={<VerifiyTheCodeAndChangePassword />}
        />
        <Route path="/mainpage" element={<HomePage />} />
        <Route path="/playlist" element={<PopularSongs />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/addyourmuisc" element={<AddYourMusic />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/createplaylist" element={<PlaylistSongs />} />
        <Route path="/customplaylist" element={<CustomPlaylist />} />
        <Route path="/userplaylist" element={<PlaylistForCustomUser />} />
      </Routes>
    </div>
  );
}
export default App;
