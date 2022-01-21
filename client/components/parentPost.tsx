import dayjs, { Dayjs } from "dayjs";
import { Post } from "../types";

export default function ParentPost({ post }) {
  console.log(post);
  return (
    <div>
      <div className=" mx-8 h-56 main-post-shadow hover:shadow-xl">
        <div className="flex flex-row h-full">
          {/* vote section */}
          <div className="flex justify-start  w-1/12">
            <div className="flex flex-col space-y-4 w-full mt-4 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
              <div>0</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 17l-4 4m0 0l-4-4m4 4V3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col  w-11/12 h-full">
            <div className="flex w-full h-2/6  items-center ">
              <span className="px-4 font-bold text-xl">{post.title}</span>
            </div>
            <div className="h-3/6 pl-4 pr-4">
              <span className="text-gray-700">{post.body}</span>
            </div>
            <div className="flex flex-row w-full pl-4 pr-4 items-center justify-between h-2/6">
              <div className="flex  space-x-2">
                <div className="">image</div>
                <div className="text-gray-500">Posted By Akhil Meheta</div>
                <div className="text-gray-500">
                  {dayjs(post.createAt).isValid}
                </div>
              </div>
              <div className="flex space-x-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <span>50+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
