import Link from "next/link";

export default function CampgroundCard({id,name,description,Location,image}:{id:string, name: string, description: string, Location:string, image: string}) {
    return (
        <div className="w-full bg-white rounded-lg shadow-lg m-2 p-2">
            <div className=" flex flex-row p-2">
                <div className="w-1/4 p-2 m-2">
                    <div className="p-1 bg-green-400 rounded-lg"> 
                        <img src={image} alt="campground-picture" className="w-full rounded-lg" />
                    </div>
                </div>
                <div className="w-2/4 p-2 m-2">
                    <h2 className="px-2 my-2 font-bold text-[30px] font-sans">{name}</h2>
                    <p  className="my-2 font-medium text-[20px] font-sans">{description}</p>
                    <div className="flex flex-row bg-slate-200 w-fit p-2 my-2 rounded-lg font-medium">
                        <img src="img/location-icon.png" alt="location" className="w-6 h-6 inline-block" />
                        <p className="px-2">{Location}</p>
                    </div>
                    
                </div>
                <div className="w-1/4 flex flex-col p-2 ">
                <Link href={`/campground/${id}`}>
                    <button className="w-2/5 bg-emerald-400 hover:bg-emerald-500 text-white py-2 rounded-3xl m-2 font-bold text-lg">Detail</button>
                </Link>
                    
                    <button  className="w-2/5 bg-emerald-400 hover:bg-emerald-500 text-white py-2 rounded-3xl m-2 font-bold text-lg">Book</button>
                </div>
            </div>
        </div>
    )
}