import React from "react";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import HotelCard from "./HotelCard";
import { useState, useEffect } from "react";

const SearchResults = ({ location, checkIn, checkOut, guests, filters }) => {
  const [sortBy, setSortBy] = useState("recommended");
  const [hotels, setHotels] = useState([]);
  const [visibleHotels, setVisibleHotels] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const handleLoadMore = () => {
    setVisibleHotels(hotels);
    setShowLoadMore(false);
  };

  useEffect(() => {
    const query = new URLSearchParams({
      location,
      sortBy,
      ...filters,
      hotelFacilities: filters.hotelFacilities?.join(","),
      propertyRatings: filters.propertyRatings?.join(","),
      propertyTypes: filters.propertyTypes?.join(","),
      priceMin: filters.priceRange?.[0],
      priceMax: filters.priceRange?.[1],
    });

    fetch(`http://localhost:5000/api/hotels/filter?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        console.log("Filtered hotels:", data);
      });
  }, [location, filters, sortBy]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/hotels?location=${encodeURIComponent(
        location
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        if (data.length > 6) {
          setVisibleHotels(data.slice(0, 6));
          setShowLoadMore(true);
        } else {
          setVisibleHotels(data);
          setShowLoadMore(false);
        }
      });
  }, [location]);

  const sortOptions = [
    { value: "recommended", label: "Our top picks" },
    { value: "price-low", label: "Price (lowest first)" },
    { value: "price-high", label: "Price (highest first)" },
    { value: "rating", label: "Guest rating" },
    { value: "distance", label: "Distance from centre" },
  ];

  return (
    <div className="flex-1">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {location}: {hotels.length} properties found
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>
                {checkIn} — {checkOut}
              </span>
              <span>{guests}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <strong>
                  93% of places to stay are unavailable for your dates on our
                  site.
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            Your results include some shared accommodations, such as dormitory
            beds.{" "}
            <button className="text-blue-600 hover:underline">
              Show private rooms only
            </button>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {visibleHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
      {showLoadMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg" onClick={handleLoadMore}>
            Load more results
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
