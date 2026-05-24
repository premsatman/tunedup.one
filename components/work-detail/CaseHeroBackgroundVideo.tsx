'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

export const DEFAULT_WORK_DETAIL_MUX_PLAYBACK_ID =
  'k024JpKRx702ElWvqX94HY4j02AkCLzx9iQEAGxJuHOXrY'

export const buildMuxHlsUrl = (playbackId: string) =>
  `https://stream.mux.com/${playbackId}.m3u8`

export const buildMuxThumbnailUrl = (playbackId: string, width = 1920) =>
  `https://image.mux.com/${playbackId}/thumbnail.webp?width=${width}`

type CaseHeroBackgroundVideoProps = {
  playbackId?: string
}

export default function CaseHeroBackgroundVideo({
  playbackId = DEFAULT_WORK_DETAIL_MUX_PLAYBACK_ID,
}: CaseHeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const streamUrl = buildMuxHlsUrl(playbackId)
    let hls: Hls | null = null

    const handlePlaying = () => setIsPlaying(true)

    const startPlayback = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked — first frame from Mux poster still shows
        })
    }

    video.addEventListener('playing', handlePlaying)

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
      video.removeEventListener('playing', handlePlaying)
      hls?.destroy()
    }
  }, [playbackId])

  const posterUrl = buildMuxThumbnailUrl(playbackId)

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isPlaying ? 'opacity-100' : 'opacity-90'
        }`}
        poster={posterUrl}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        tabIndex={-1}
      />
    </div>
  )
}
