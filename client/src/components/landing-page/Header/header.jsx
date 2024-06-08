import React from "react";
import Nav from "./navlink";
import Logo from "./logo";

function Header() {

  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };

  return (<>
    <header className="bg-[#810101] sticky top-0 z-[20] mx-auto w-full items-center justify-between flex flex-wrap border">
      <Logo/>
      <div className="">
        <Nav />
      </div>
    </header>

    </>
  );
}

export default Header;
