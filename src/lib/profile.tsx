import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
export async function getProfileInfo(){
    try {
        const user = await getServerSession(authOptions)
        if (!user) return notFound()

        const userProfile = await db.userProfile.findFirst({
            where: { userId: user.user.id }
        })
        return userProfile

    } catch (error) {
        console.log('Error  loading user profile data: ', error);
    }
    
}