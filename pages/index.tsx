import { ClientRequest } from 'http'
import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'
import Player from '../components/Player'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Music Streaming App</title>
      </Head>
      <main className='flex'>
        <Sidebar/>
        <Center/>

      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export default Home


// prefetch data in order to have access to initial session data
export async function getServerSideProps(context:any){
  const session = await getSession(context)

  return{
    props: {
      session,
    }
  }
}
