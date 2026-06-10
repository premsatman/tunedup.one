'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImage } from '@/lib/types/mission'
import { buildMuxHlsUrl, buildMuxThumbnailUrl } from '@/components/work-detail/CaseHeroBackgroundVideo'

type CaseHeroFeaturedMediaProps = {
  image?: SanityImage
  videoPlaybackId?: string
  alt: string
}

export default function CaseHeroFeaturedMedia({
  image,
  videoPlaybackId,
  alt,
}: CaseHeroFeaturedMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const playbackId = videoPlaybackId?.trim()
  const imageUrl = image ? urlFor(image).width(1920).url() : null

  useEffect(() => {
    if (!playbackId) return

    const video = videoRef.current
    if (!video) return

    setIsVideoReady(false)

    const streamUrl = buildMuxHlsUrl(playbackId)
    let hls: Hls | null = null

    const handleReady = () => setIsVideoReady(true)

    const startPlayback = () => {
      video.play().catch(() => {
        // Autoplay blocked — image poster remains visible when set
      })
    }

    video.addEventListener('loadeddata', handleReady)
    video.addEventListener('playing', handleReady)

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl
      video.load()
      startPlayback()
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      })
      hls.loadSource(streamUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, startPlayback)
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          hls?.destroy()
        }
      })
    } else {
      video.src = streamUrl
      startPlayback()
    }

    return () => {
      video.removeEventListener('loadeddata', handleReady)
      video.removeEventListener('playing', handleReady)
      hls?.destroy()
    }
  }, [playbackId])

  if (!imageUrl && !playbackId) return null

  const showImage = Boolean(imageUrl)
  const showVideo = Boolean(playbackId)
  const imageVisible = showImage && (!showVideo || !isVideoReady)

  return (
    <div className="relative h-full w-full">
      {showVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          poster={imageUrl ?? buildMuxThumbnailUrl(playbackId!)}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          tabIndex={-1}
          aria-hidden={showImage}
        />
      )}

      {showImage && imageUrl && (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1280px) calc(100vw - 3rem), min(1280px, calc(100vw - 6rem))"
          className={`relative z-10 h-full w-full object-cover object-center transition-opacity duration-500 ${
            imageVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />
      )}
    </div>
  )
}
