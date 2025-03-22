import Link from "next/link";

export default function CampgroundCard({ id, name, description, location, image }: { id: string; name: string; description: string; location: string; image: string }) {
    return (
        <div className="w-full max-w-4xl h-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-64">
            <div className="flex flex-row p-6 gap-6 h-full">
                <div className="w-1/3 flex items-center">
                    <div className="bg-green-500 rounded-2xl overflow-hidden shadow-md w-full">
                        <img src={image} alt="campground-picture" className="w-full h-48 object-cover" />
                    </div>
                </div>
                <div className="w-2/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-emerald-800">{name}</h2>
                        <p className="text-emerald-600 mt-3 text-base line-clamp-3">{description}</p>
                        <div className="flex items-center bg-slate-200 border-lime-200 w-fit p-3 mt-4 rounded-lg text-gray-700">
                            <img src="/img/location-icon.png" alt="location" className="w-6 h-6 mr-2" />
                            <span>{location}</span>
                        </div>
                    </div>
                    <div className="flex gap-6 mt-6">
                        <Link href={`/campground/${id}`}>
                            <button className="p-6 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-md">Detail</button>
                        </Link>
                        <Link href={`/booking?id=${id}`}>
                            <button className="p-6 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-md">Book</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
