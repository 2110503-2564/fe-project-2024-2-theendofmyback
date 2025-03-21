import CampgroundCard from "@/components/CamgroundCard"

export default function Campground() {
    const mockCampgrounds = [
        {
            _id: "67bd6dfcd3e3272696f5243d",
            name: "Mountain View Camp",
            address: "123 Forest Road, Rocky Hills",
            tel: "555-1234",
            price: 25,
            capacity: 60,
            description: "A beautiful campsite with a breathtaking mountain view.",
            image: "img/mountain-view.jpg"
        },
        {
            _id: "67bd6dfcd3e3272696f5243e",
            name: "Lakeside Retreat",
            address: "456 River Lane, Serene Lake",
            tel: "555-5678",
            price: 30,
            capacity: 50,
            description: "A peaceful campsite by the lake, perfect for fishing and kayaking.",
            image: "img/lakeside.jpg"
        },
        {
            _id: "67bd6dfcd3e3272696f5243f",
            name: "Forest Haven",
            address: "789 Pinewood Trail, Green Forest",
            tel: "555-9101",
            price: 20,
            capacity: 40,
            description: "A secluded campsite surrounded by lush greenery and hiking trails.",
            image: "img/forest-haven.jpg"
        }
    ];

    return (
        <div className="w-full flex flex-col items-center">
        <h1 className="text-[40px] font-sans font-semibold">Campground</h1>

        <div className="w-full flex flex-row items-center justify-center">
            <input type="text" placeholder="Search" className="w-4/5 p-2 m-2 rounded-3xl border-2" />
            <button className="bg-orange-300 hover:bg-orange-400 text-white px-4 py-2 rounded-3xl m-2 font-bold text-lg">Search</button>
        </div>
        {mockCampgrounds.map(campground => (
                <CampgroundCard 
                    key={campground._id}
                    name={campground.name}
                    description={campground.description}
                    Location={campground.address}
                    image={campground.image}
                />
            ))}    
        </div>
    )
}