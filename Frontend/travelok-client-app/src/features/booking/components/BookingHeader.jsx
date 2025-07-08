import React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { useEffect, useState } from "react";

const BookingHeader = ({ onSearch }) => {
  const [searchData, setSearchData] = React.useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
    rooms: "1",
  });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hotels/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        console.log("Available locations:", data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (new Date(searchData.checkOut) <= new Date(searchData.checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    onSearch(searchData);
  };

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className=" md:text-[#fffff] relative z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--primary-color), var(--primary-light))",
        boxShadow: "var(--shadow-lg)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Where to next, Explorer?
          </h1>
          <p className="text-xl text-blue-100">
            Find exclusive verified stays in every corner of the world!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl p-6 md:p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
              <div className="space-y-2 md:col-span-4 relative z-10">
                <Label
                  htmlFor="location"
                  className="text-gray-700 font-medium flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Where are you going?
                </Label>
                <Select
                  value={searchData.location}
                  onValueChange={(value) =>
                    handleInputChange("location", value)
                  }
                  required
                >
                  <SelectTrigger
                    id="location"
                    className="h-12 w-full border border-gray-300 rounded-md shadow-sm"
                  >
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>

                  <SelectContent className="z-50 bg-[#ffffff] shadow-xl">
                    {locations.length > 0 ? (
                      locations.map((loc) => (
                        <SelectItem
                          key={loc}
                          value={loc}
                          className="text-gray-800"
                        >
                          {loc}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-gray-500 text-sm">
                        No locations available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Check-in Date */}
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="checkin"
                  className="text-gray-700 font-medium flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Check-in
                </Label>
                <Input
                  id="checkin"
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="h-12 text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="checkout"
                  className="text-gray-700 font-medium flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Check-out
                </Label>
                <Input
                  id="checkout"
                  type="date"
                  value={searchData.checkOut}
                  min={searchData.checkIn}
                  onChange={(e) =>
                    handleInputChange("checkOut", e.target.value)
                  }
                  className="h-12 text-gray-900"
                  required
                />
              </div>

              {/* Guests Section */}
              <div className="space-y-2 md:col-span-4">
                <Label className="text-gray-700 font-medium flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Guests & Rooms
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select
                      value={searchData.adults}
                      onValueChange={(value) =>
                        handleInputChange("adults", value)
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Adults" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-[#ffffff] shadow-xl">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Adult" : "Adults"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Select
                      value={searchData.children}
                      onValueChange={(value) =>
                        handleInputChange("children", value)
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Children" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-[#ffffff] shadow-xl">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Child" : "Children"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select
                      value={searchData.rooms}
                      onValueChange={(value) =>
                        handleInputChange("rooms", value)
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Rooms" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-[#ffffff] shadow-xl overflow-x-hidden">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Room" : "Rooms"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 px-12 h-12 text-lg transition-all duration-300 transform hover:scale-105"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Hotels
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
