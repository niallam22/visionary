import ApiDashboard from '@/components/ApiDashboard'
import RequestApiKey from '@/components/RequestApiKey'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { getProfileInfo } from "@/lib/profile";
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProfileDisplay from '@/components/ProfileDisplay'

export const metadata: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Free & open-source text similarity API',
}

export default async function page () {
  const user = await getServerSession(authOptions)
  const userProfile = await getProfileInfo();
  if (!user) return notFound()
  if (userProfile === undefined) return notFound()
  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  })

  return (
    <div className='max-w-7xl mx-auto mt-16'>
      <div>
        <ProfileDisplay userProfile={userProfile}/>
      </div>
      <div>
      {apiKey ? (
        // @ts-expect-error Server Component
        <ApiDashboard />
      ) : (
        <RequestApiKey />
      )}
      </div>
    </div>
  )
}