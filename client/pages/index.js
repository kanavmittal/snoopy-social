import Head from "next/head";
import Image from "next/image";
import MenuBar from "../components/menuBar.tsx";
import ThreadsMain from "../components/postsAll";
import HotRightBar from "../components/hotRightBar.tsx";
export default function Home() {
  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8 pt-16 h-screen">
      <div className="flex flex-row h-full">
        <MenuBar></MenuBar>
        <ThreadsMain></ThreadsMain>
        <HotRightBar></HotRightBar>
      </div>
    </div>
  );
}
