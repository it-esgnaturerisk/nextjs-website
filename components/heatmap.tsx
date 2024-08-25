// components/Heatmap.js
export default function Heatmap() {
    const countries = [
      { name: "ESP", count: 15, color: "bg-green-400" },
      { name: "CHN", count: 6, color: "bg-green-300" },
      { name: "FRA", count: 2, color: "bg-red-200" },
      { name: "DEU", count: 1, color: "bg-red-300" },
      { name: "NOR", count: 8, color: "bg-orange-200" },
      // Add more countries as necessary
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-2">
          {countries.map((country, index) => (
            <div key={index} className={`${country.color} p-2 text-center`}>
              {country.count} {country.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
  