import { Routes as Paths, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Replay } from "./screens/Replay";

export const Routes = () => {
  return (
    <Paths>
      <Route element={<Home />} path={"/"} />
      <Route element={<Replay />} path={"/replay"} />
    </Paths>
  );
};
