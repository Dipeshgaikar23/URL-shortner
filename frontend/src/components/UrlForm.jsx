import { useState } from 'react'
import { createShortUrl } from '../apis/shorturl.api'
import { useSelector } from 'react-redux'

export const UrlForm = () => {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [copied, setCopied] = useState(false)
    const [customSlug, setCustomSlug] = useState('')
    const { isAuthenticated } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!url) return
        console.log('sending')
        const shortUrl = await createShortUrl(url, customSlug)
        setShortUrl(shortUrl)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Disable button if URL is empty
    const isDisabled = url.trim() === ''

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-500 mb-1">
                    Enter your URL
                </label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                {!isAuthenticated && (<div className='my-4 text-center text-gray-700'>
                    Login to make Custom URLs
                </div>)}
            </div>

            {isAuthenticated && (
                <div className="mt-4">
                    <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
                        Custom URL (optional)
                    </label>
                    <input
                        type="text"
                        id="customSlug"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        placeholder="Enter custom url"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    />
                </div>
            )}

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isDisabled}
                className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${isDisabled
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                Shorten URL
            </button>

            {shortUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-medium mb-2">Your shortened URL:</h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={shortUrl}
                            readOnly
                            className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
                        />
                        <button
                            onClick={handleCopy}
                            type="button"
                            className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}
