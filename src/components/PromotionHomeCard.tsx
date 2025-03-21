export default function PromotionHomeCard() {
    return (
        <div className="flex flex-col bg-white rounded-3xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2
                            className="text-lg font-bold tracking-tighter text-green-600 lg:text-3xl"
                        >
                            Starter pack
                        </h2>
                        <p className="mt-2 text-sm text-green-500">Very Discount.</p>
                    </div>
                    <div className="mt-6">
                        <p>
                            <span className="text-5xl font-bold tracking-tight text-green-800">
                                $25
                            </span>
                            <span className="text-base font-medium text-green-600"> /camp </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
                <a
                    aria-describedby="tier-company"
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-green-600 border-2 border-green-600 rounded-full nline-flex hover:bg-transparent hover:border-green-600 hover:text-green-600 focus:outline-none focus-visible:outline-green-600 text-sm focus-visible:ring-green-600"
                    href="/promotion"
                >
                    Get Discount
                </a>
            </div>
        </div>
    )
}
