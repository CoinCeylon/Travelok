import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  MapPin,
  Wifi,
  Car,
  Waves,
  Heart,
  Star,
  CheckCircle,
} from "lucide-react";
import { useEffect } from "react";

const HotelCard = ({ hotel }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isBooking, setIsBooking] = React.useState(false);
  const [isBooked, setIsBooked] = React.useState(false);

  useEffect(() => {
    if (hotel.is_booked) {
      setIsBooked(true);
    }
  }, [hotel.is_booked]);

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "parking":
        return <Car className="w-4 h-4" />;
      case "pool":
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleReserve = async () => {
    setIsBooking(true);

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: hotel.room_id,
          walletAddress:
            "addr_test1qphx3k7l5f5c3qnlx9n5g2h9fx8k2alztm50f4m9lx3rr4eahh3uaf9h8x0",
        }),
      });

      if (res.ok) {
        setIsBooked(true);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="relative flex items-center justify-center">
            <div className="w-80 h-64 grid grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
              {/* Left side - two stacked images */}
              <div className="grid grid-rows-2 gap-0.5 h-full w-40">
                <img
                  src={
                    hotel.images?.[0] ||
                    "https://placehold.co/300x200?text=No+Image"
                  }
                  alt="Image 1"
                  className="h-32 object-cover rounded-tl-lg"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/300x200?text=No+Image")
                  }
                />
                <img
                  src={
                    hotel.images?.[1] ||
                    "https://placehold.co/300x200?text=No+Image"
                  }
                  alt="Image 2"
                  className="h-32 object-cover rounded-bl-lg"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/300x200?text=No+Image")
                  }
                />
              </div>

              {/* Right side - one large image */}
              <div className="row-span-2 w-40 h-full">
                <img
                  src={hotel.hotel_image}
                  alt="Image 3"
                  className="w-full h-full object-cover rounded-r-lg"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/400x400?text=No+Image")
                  }
                />
              </div>
            </div>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>

            <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
              {hotel.property_rating}
            </Badge>
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer mb-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>
                  <p className="text-sm text-gray-500">
                    {hotel.distance} km from center
                  </p>
                  {hotel.brand_name && (
                    <p className="text-sm text-gray-500">
                      Brand: {hotel.brand_name}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-800">
                    {hotel.ratings?.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Facilities
                </p>
                <div className="flex items-center space-x-2">
                  {(hotel.hotel_facilities || [])
                    .slice(0, 3)
                    .map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-gray-600"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  LKR {hotel.price?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{hotel.room_type}</div>

                <div className="text-sm text-gray-600">
                  +LKR{" "}
                  {Math.round(
                    (8000 + hotel.ratings * 1000) * 0.12
                  ).toLocaleString()}{" "}
                  taxes and charges
                </div>

                {isBooked && (
                  <div className="mt-1 flex items-center justify-end text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" /> Room booked
                  </div>
                )}
              </div>

              <Button
                onClick={handleReserve}
                disabled={isBooking || isBooked}
                className={`ml-4 ${
                  isBooked
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isBooked
                  ? "Reserved"
                  : isBooking
                  ? "Processing..."
                  : "Reserve"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
