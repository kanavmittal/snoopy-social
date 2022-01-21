export default function MenuBar() {
  const isActive: any = {
    home: false,
    explore_topics: false,
    my_topics: false,
    chats: false,
  };
  return (
    <div className="h-full w-2/12 ">
      <div className="flex flex-col space-y-4 mt-8">
        <span className="font-medium px-8">MENU</span>
        <div
          className={
            "flex space-x-2 py-2 px-2 text-gray-600 hover:bg-blue-200 hover:text-black " +
            (isActive.home &&
              " border-l-8 text-blue-900 font-medium border-blue-500 bg-blue-200")
          }
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span>Home</span>
        </div>
        <div
          className={
            "flex space-x-2 py-2 px-2 text-gray-600 hover:bg-blue-200 hover:text-black " +
            (isActive.explore_topics &&
              " text-blue-700 font-medium border-blue-500 bg-blue-200")
          }
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <span>Explore Topics</span>
        </div>
        <div
          className={
            "flex space-x-2 py-2 px-2 text-gray-600 hover:bg-blue-200 hover:text-black " +
            (isActive.my_topics &&
              " text-blue-700 font-medium border-blue-500 bg-blue-200")
          }
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <span className="text-gray-600">My Topics</span>
        </div>
        <div
          className={
            "flex space-x-2 py-2 px-2 text-gray-600 hover:bg-blue-200 hover:text-black " +
            (isActive.chats &&
              " text-blue-700 font-medium border-blue-500 bg-blue-200")
          }
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <span className="text-gray-600">Chats</span>
        </div>
      </div>
    </div>
  );
}
