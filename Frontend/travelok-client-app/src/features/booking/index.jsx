import React, { useState } from "react";
import BookingHeader from "./components/BookingHeader";
import FilterSidebar from "./components/FilterSidebar";
import SearchResults from "./components/SearchResults";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (data) => {
    setSearchData(data);
    setShowResults(true);
  };

  if (!showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BookingHeader onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                🌟 Popular Destinations
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Colombo", emoji: "🏙️", hotels: 245 },
                  { name: "Kandy", emoji: "🏔️", hotels: 156 },
                  { name: "Galle", emoji: "🏖️", hotels: 134 },
                  { name: "Negombo", emoji: "🌊", hotels: 123 },
                  { name: "Ella", emoji: "🌿", hotels: 89 },
                  { name: "Nuwara Eliya", emoji: "🏔️", hotels: 67 },
                ].map((destination) => (
                  <div
                    key={destination.name}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {destination.emoji}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {destination.hotels} properties
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                🔒 Why Choose BlockStay?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "⛓️",
                    title: "Blockchain Verified",
                    description:
                      "All hotels verified on Cardano blockchain for authenticity and trust",
                  },
                  {
                    icon: "🔐",
                    title: "Secure Payments",
                    description:
                      "Cryptocurrency and traditional payment methods with smart contracts",
                  },
                  {
                    icon: "🎨",
                    title: "NFT Receipts",
                    description:
                      "Get unique NFT receipts as proof of stay and collectible memories",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-6xl mx-auto">
      <div className="bg-[#fffff] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-blue-900">Home</span>
            <span className="text-blue-900">›</span>
            <span className="text-blue-900">Sri Lanka</span>
            <span className="text-blue-900">›</span>
            <span className="text-blue-900">Jaffna District</span>
            <span className="text-blue-900">›</span>
            <span className="text-blue-900">{searchData?.location}</span>
            <span className="text-blue-900">›</span>
            <span className="text-blue-900">Search results</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar onFilterChange={handleFilterChange} />
          <SearchResults
            location={searchData?.location || "Colombo"}
            checkIn={searchData?.checkIn || ""}
            checkOut={searchData?.checkOut || ""}
            guests={`${searchData?.adults || 2} adults · ${
              searchData?.children || 0
            } children · ${searchData?.rooms || 1} room`}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
