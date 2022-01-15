import Head from "next/head";
import Image from "next/image";
import MenuBar from "../components/menuBar.tsx";
import ThreadsMain from "../components/threadsMain";
import HotRightBar from "../components/hotRightBar.tsx";
export default function Home() {
  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8">
      <div className="flex flex-row">
        <MenuBar></MenuBar>
        <ThreadsMain></ThreadsMain>
        <HotRightBar></HotRightBar>
      </div>
    </div>
  );
}
