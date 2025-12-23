export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 font-serif">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-iis-navy border-t-transparent rounded-full animate-spin"></div>
                <p>Loading Admin Portal...</p>
            </div>
        </div>
    );
}
