const Loading = () => {
  return (
    // <div className="h-full w-full flex items-center justify-center">
    //   <Loader className="h-6 w-6 text-green-600 animate-spin"/>
    // </div>

    <div className="flex h-screen text-center">
      <div className="m-auto ">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full animate-pulse bg-green-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-green-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-green-600"></div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
