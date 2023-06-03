"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, UserProfile } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

interface UserSettingsProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">,
  userProfile: Pick<UserProfile, "welcomeMsg">,
}

const userSettingsSchema = z.object({
  name: userNameSchema,
  welcomeMsg: z.string().nullable(),
});

type FormData = z.infer<typeof userSettingsSchema>;

export function UserSettingsForm({ user, userProfile, className, ...props }: UserSettingsProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: { name: user.name || undefined },
      welcomeMsg: userProfile.welcomeMsg || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your settings were not updated. Please try again.",
        type: "error",
      })
    }

    toast({
      message: "Your settings have been updated.",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card className="dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-slate-100">Your Name</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle className="dark:text-slate-100">Message</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Enter a message that will be displayed on your profile page when you sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="welcomeMsg">
              Welcome Message
            </Label>
            <Input
              id="welcomeMsg"
              className="w-[400px]"
              size={32}
              {...register("welcomeMsg")}
            />
            {/* {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )} */}
          </div>
        </CardContent>

        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
