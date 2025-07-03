import { useState } from 'react'
import axios from 'axios'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { createShortUrl } from '../apis/shorturl.api'
import { useSelector } from 'react-redux'

export const UrlForm = () => {
    // const queryClient = new useQueryClient()/
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [copied, setCopied] = useState(false)
    const [customSlug, setCustomSlug] = useState('')
    const { isAuthenticated } = useSelector((state) => state.auth)

    const handleSubmit = async () => {
        console.log('sending');
        const shortUrl = await createShortUrl(url, customSlug)
        setShortUrl(shortUrl)
        // queryClient.invalidateQueries({ queryKey: ['userUrls'] })
        // console.log(data)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl)
        setCopied(true)

        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <>
            <div className="space-y-4">
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter your URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button type="submit" onClick={handleSubmit}
                    // disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    Shorten URL
                    {/* {isLoading ? 'Shortening...' : 'Shorten URL'} */}
                </button>
                {/* {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )} */}
                {isAuthenticated && (
                    <div className='mt-4'>
                        <label htmlFor="customSlug" className='block text-sm font-medium text-gray-700 mb-1'>
                            Custom URL (optional)
                        </label>
                        <input
                            type="text"
                            id='customSlug'
                            value={customSlug}
                            onChange={(event) => setCustomSlug(event.target.value)}
                            placeholder='Enter custom url'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2'
                        />
                    </div>
                )

                }
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
                                className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
