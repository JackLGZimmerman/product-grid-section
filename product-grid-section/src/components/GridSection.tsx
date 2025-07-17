const GridSection = () => {
    return (
      <div className="bg-gray-300 h-screen p-20">
        <div className="bg-gray-200 w-80% p-4 rounded-md">
          <div className="bg-white p-12 rounded-md">
            <div className="flex justify-between mb-4">
              <h1 className="text-lg font-bold">Latest Arrivals</h1>
              <button className="text-xs border border-gray-200 shadow-md p-2 rounded-md">View all</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
}

export default GridSection