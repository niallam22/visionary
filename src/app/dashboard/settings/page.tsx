import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getServerSession } from 'next-auth'
import { getProfileInfo } from "@/lib/profile";
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserSettingsForm } from "@/components/userSettingsForm"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getServerSession(authOptions)
  let userProfile = await getProfileInfo();
  
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  if (!userProfile) {
    const response = await fetch(`/api/userProfile/${user.user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        welcomeMsg: 'Welcome to visionary',
      }),
    })
    if (response.ok) {
      userProfile = await getProfileInfo();
      if(!userProfile) {
        return console.log('Error getting user profile')
      }
    } else {
      return console.log('Error getting user profile')
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserSettingsForm 
          user={{ id: user.user.id, name: user.user.name || ""}}
         userProfile={{welcomeMsg: userProfile.welcomeMsg}} />
      </div>
    </DashboardShell>
  )
}
