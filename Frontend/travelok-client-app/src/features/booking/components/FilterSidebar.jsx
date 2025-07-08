import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Slider } from "../../../components/ui/slider";
import { Button } from "../../../components/ui/button";
import { Star } from "lucide-react";

const FilterSidebar = () => {
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedBedTypes, setSelectedBedTypes] = useState([]);
  const [selectedRoomFacilities, setSelectedRoomFacilities] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const hotelFacilities = [
    "Wifi",
    "Parking",
    "Restaurant",
    "Fitness center",
    "Swimming Pool",
    "Electric vehicle charging station",
    "Spa and wellness center",
    "Airport shuttle",
    "Hot tub/jacuzzi",
  ];

  const propertyTypes = ["Hotels", "Guest Houses", "Villas", "Resorts"];

  const bedPreferences = [
    "Twin Beds",
    "Double Bed",
    "Single Bed",
    "King bed",
    "Queen bed",
  ];

  const roomFacilities = [
    "Air conditioning",
    "Private Bathroom",
    "Flat-screen TV",
    "Balcony",
    "Coffee/tea maker",
    "Electric Kettle",
  ];

  const meals = [
    "All inclusive",
    "Breakfast included",
    "Dinner included",
    "Lunch Included",
  ];

  const roomTypes = [
    "Deluxe Room",
    "Ocean View Suite",
    "Luxury Room",
    "Eco Suite",
    "Classic Room",
    "Villa Room",
  ];

  const brands = [
    "Jetwing Hotels Limited",
    "Radisson",
    "Thema Collection",
    "Cinnamon Hotels",
    "Hilton",
  ];

  const handleCheckboxChange = (setter, value) => (checked) => {
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const clearAllFilters = () => {
    setSelectedStars([]);
    setSelectedAmenities([]);
    setSelectedPropertyTypes([]);
    setSelectedBedTypes([]);
    setSelectedRoomFacilities([]);
    setSelectedMeals([]);
    setSelectedRoomTypes([]);
    setSelectedBrands([]);
  };

  return (
    <div className="w-80 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Filter by</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-blue-600"
        >
          Clear all
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Star rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedStars.includes(star)}
                onCheckedChange={handleCheckboxChange(setSelectedStars, star)}
              />
              <Label className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(star)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({star} star{star > 1 ? "s" : ""})
                </span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hotel Facilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {hotelFacilities.map((facility, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedAmenities.includes(facility)}
                onCheckedChange={handleCheckboxChange(
                  setSelectedAmenities,
                  facility
                )}
              />
              <Label className="text-sm">{facility}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Property type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {propertyTypes.map((type, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedPropertyTypes.includes(type)}
                onCheckedChange={handleCheckboxChange(
                  setSelectedPropertyTypes,
                  type
                )}
              />
              <Label className="text-sm">{type}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bed preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {bedPreferences.map((bed, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedBedTypes.includes(bed)}
                onCheckedChange={handleCheckboxChange(setSelectedBedTypes, bed)}
              />
              <Label className="text-sm">{bed}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Room facilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {roomFacilities.map((facility, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedRoomFacilities.includes(facility)}
                onCheckedChange={handleCheckboxChange(
                  setSelectedRoomFacilities,
                  facility
                )}
              />
              <Label className="text-sm">{facility}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Meals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {meals.map((meal, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedMeals.includes(meal)}
                onCheckedChange={handleCheckboxChange(setSelectedMeals, meal)}
              />
              <Label className="text-sm">{meal}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Room types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {roomTypes.map((type, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedRoomTypes.includes(type)}
                onCheckedChange={handleCheckboxChange(
                  setSelectedRoomTypes,
                  type
                )}
              />
              <Label className="text-sm">{type}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={handleCheckboxChange(setSelectedBrands, brand)}
              />
              <Label className="text-sm">{brand}</Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;
