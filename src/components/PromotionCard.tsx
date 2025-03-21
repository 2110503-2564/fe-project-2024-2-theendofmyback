import Link from "next/link";


interface Promotion {
    _id: string;
    name: string;
    campground: string;
    description: string;
    discount: number;
}

export default function PromotionCard({ mockPromotions }: { mockPromotions: Promotion }) {
    /*const mockPromotions = 
        {
          _id: "67bd907379db2d1502b32995",
          name: "Discount 200",
          campground: "67bd6dfcd3e3272696f5243d",
          description: "Get 200 off on your next booking! Use code: DISCOUNT200",
          discount: 200,
        }*/
    return (
        <div className="flex flex-row border-x-4 border-y-2 py-10 border-emerald-600 w-fit h-fit bg-white rounded-lg shadow-lg m-2 p-2">
            
            <div>
                
                <div className="flex flex-row items-center justify-between">
                    <img src={"/img/cedt-coin.png"} className="w-12"></img>
                    <h1 className="font-bold text-[50px] text-emerald-600">{mockPromotions.discount.toString()}</h1>
                </div>
                <Link href="/booking">
                <div className="justify-items-end"><p className="bg-emerald-600 text-[16px] font-bold text-white py-1 px-2 rounded-2xl -rotate-6 ">discount</p></div>    
                </Link>
            </div>
            <div className="border-l-2 border-emerald-600 h-auto mx-4"></div>
            <div className="w-[250px]">
                <h2 className="text-[25px] font-medium">{mockPromotions.name}</h2>
                <p className="my-2 text-[15] font-sans whitespace-pre-line">{mockPromotions.description}</p>  
            </div>
            
        </div>
    )
}