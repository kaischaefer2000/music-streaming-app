import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'

function Songs() {
  const playlist = useRecoilValue(playlistState)
    return (
    <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
        {playlist?.tracks.items.map((item, index) => (
            <Song key={item.track.id} track={item} order={index}/>
        ))}
    </div>
  )
}

export default Songs