import React, { useState } from "react";
import { Link } from "react-router";

const KidsPage = () => {
  const [selectedAge, setSelectedAge] = useState("all");

  const ageGroups = [
    { id: "all", name: "All Kids" },
    { id: "newborn", name: "Newborn (0-9M)" },
    { id: "baby", name: "Baby (9M-2Y)" },
    { id: "kids", name: "Kids (2-8Y)" },
    { id: "junior", name: "Junior (8-14Y)" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1600&h=600&fit=crop"
          alt="Kids Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">KIDS</h1>
          <p className="text-xl font-light">Fun fashion for every adventure</p>
        </div>
      </div>

      {/* Age Group Filters */}
      <div className="max-w-[1600px] mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-200">
          {ageGroups.map((age) => (
            <button
              key={age.id}
              onClick={() => setSelectedAge(age.id)}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                selectedAge === age.id
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              {age.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-[1600px] mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/kids/girls" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&h=500&fit=crop"
              alt="Girls"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Girls</h3>
            </div>
          </Link>

          <Link to="/kids/boys" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=500&h=500&fit=crop"
              alt="Boys"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Boys</h3>
            </div>
          </Link>

          <Link to="/kids/baby" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500&h=500&fit=crop"
              alt="Baby"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Baby</h3>
            </div>
          </Link>

          <Link to="/kids/shoes" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1514590242912-47a0d8e0d3c8?w=500&h=500&fit=crop"
              alt="Shoes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Shoes</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-[#faf9f8] py-16 mb-12">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="px-8">
              <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">BACK TO SCHOOL</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Ready for<br />New Adventures
              </h2>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Get them ready for the new school year with our durable and stylish collection. From backpacks to sneakers, we've got everything covered.
              </p>
              <Link
                to="/kids/back-to-school"
                className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-all uppercase inline-block"
              >
                Shop Now
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop"
                alt="Back to School"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-12 mb-12">
        <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">Kids Fashion at H&M</h2>
        <div className="space-y-4 text-base leading-relaxed text-gray-800">
          <p>
            Welcome to H&M Kids! Discover trendy and comfortable clothing for children of all ages. From newborns to teenagers, we offer a wide range of styles that combine fashion with functionality.
          </p>
          <p>
            Our collections are designed with both kids and parents in mind. We use soft, durable fabrics that can withstand all their adventures, while keeping them looking stylish and feeling comfortable.
          </p>
          <p>
            Shop by age group or browse our full collection to find the perfect outfits for school, play, special occasions, and everything in between. With H&M Kids, getting dressed is always fun!
          </p>
        </div>
      </div>
    </div>
  );
};

export default KidsPage;