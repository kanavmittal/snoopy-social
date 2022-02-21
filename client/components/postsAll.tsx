import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../types";
import ParentPost from "./perPosts";
export default function ThreadsMain() {
  const [post, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios
      .get("/post")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="h-full w-7/12 overflow-auto no-scrollbar bg-gray-100">
      <div className="flex flex-col w-full h-full mt-8 space-y-4">
        {/* single thread */}
        {post.map((perPost) => {
          return (
            <ParentPost key={perPost.identifier} post={perPost}></ParentPost>
          );
        })}
      </div>
    </div>
  );
}
