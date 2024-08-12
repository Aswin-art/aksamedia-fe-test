import { Link } from "react-router-dom";
import Wrapper from "./wrapper";
import Dropdown from "./dropdown";
import DarkMode from "./dark-mode";

const Navbar = () => {
  return (
    <div className="w-full z-20 p-4">
      <Wrapper>
        <div className="flex justify-between items-center gap-4">
          <aside>
            <Link to={"/"} className="text-blue-500 font-bold text-2xl">
              Dashboard
            </Link>
          </aside>
          <aside className="flex gap-4 justify-between items-center">
            <Dropdown />
            <DarkMode />
          </aside>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
