import React from "react";
import Logo from "../../../public/logo-white.png";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="bg-primary dark:bg-slate-700 py-2 px-5 flex justify-between">
      <Link href="/">
        <Image src={Logo} alt="my-logo" width={100} />
      </Link>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      </Avatar>
    </div>
  );
};

export default Navbar;
