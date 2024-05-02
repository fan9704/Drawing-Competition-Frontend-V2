export default function Header() {
    return (
        <header className="bg-zinc-900 h-16 border-b border-b-zinc-400 text-white px-14 flex justify-between items-center">
            <div className="flex gap-4">
                <h1 className="text-xl font-bold">Scribble Showdown</h1>
            </div>
            <div className="flex gap-4 items-center justify-end">
                <p className="">第六隊</p>
                <div className="px-3 py-1.5 bg-yellow-600 text-white rounded-md font-bold">
                    R1 25:00
                </div>
            </div>
        </header>
    );
}
