import SnowfallBg from "@/components/newsletter/SnowfallBg";
import { ExternalLink, Github, Loader2, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export const siteConfig = {
  name: "Felix letter",
  description: "Felix letter a newsletter for dev's made with Nextjs",
  ogImage: "https://devletter.vercel.app/og-image.png",
  url: "https://devletter.vercel.app/",
};

const NewsletterPage = (props: Props) => {
  return (
    <main className="flex relative h-screen flex-col items-center justify-between p-20 max-sm:p-4 bg-[#030712]">
      <SnowfallBg />
      <div className="h-full w-full flex justify-center items-center flex-col gap-8">
        <span className="gap-2 animate-pulse justify-center items-center text-xs p-2 border border-white rounded-full flex text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          3k+ Member joined
        </span>
        <div className="flex flex-col w-full justify-center items-center gap-3">
          <h1 className="text-3xl font-bold sm:text-4xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-tr from-white to-neutral-800 capitalize max-sm:text-[1.4rem] md:max-w-3xl lg:max-w-5xl">
            Welcome to Felix Newsletter
          </h1>

          <p className="max-w-[750px] leading-7 text-center text-[16px] bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-700 max-sm:text-xs">
            Join me for weekly tech News and stay ahead with the latest tech
            trends, Checkout amazing projects, Get valuable blogs and tips, and
            be the first to know about upcoming hackathons. Don&#x27;t miss out
            on the tech revolution &#x2015; Join us now and get our weekly dose
            of Felix Letter.
          </p>
        </div>
        <div className="flex flex-col w-full justify-center gap-3 items-center">
          <form className="flex h-auto flex-row w-full justify-center items-center gap-2">
            <input
              className=" p-3 shadow-sm text-sm text-white bg-slate-900 border border-gray-700 transition-colors  min-w-[35%] font-poppins rounded-md "
              type="email"
              required
              placeholder="Enter your e-mail address"
            />
            <button
              type="submit"
              className="p-3 shadow-sm  font-semibold text-sm text-white bg-slate-900 border border-gray-700 rounded-md hover:bg-slate-800 disabled:cursor-not-allowed"
            >
              {false ? <Loader2 className="h-5 w-5 animate-spin" /> : "Join us"}
            </button>
          </form>
          <div className="flex p-3 gap-3 text-gray-600">
            <Link href={"https://github.com/felixivance"} target="blank">
              <Github className="h-5 w-5 hover:text-white" />
            </Link>
            <Link href={"https://twitter.com/felixivance"} target="blank">
              <Twitter className="h-5 w-5 hover:text-white" />
            </Link>
            <Link href={"https://felixrunye.com"} target="blank">
              <ExternalLink className="h-5 w-5 hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsletterPage;
