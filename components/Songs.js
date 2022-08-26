import React from 'react'
import Song from './Song'

function Songs({ playlist }) {
  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((item, index) => (
        <Song key={item.track?.id} track={item} order={index} />
      ))}
    </div>
  );
}

export default Songs