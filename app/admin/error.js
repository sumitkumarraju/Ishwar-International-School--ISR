'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong!</h2>
                <p className="text-slate-600 mb-6 font-mono text-sm bg-slate-100 p-2 rounded overflow-auto text-left">
                    {error.message || "An unexpected error occurred"}
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300 transition-colors"
                    >
                        Reload Page
                    </button>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-iis-navy text-white rounded hover:bg-slate-800 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    )
}
