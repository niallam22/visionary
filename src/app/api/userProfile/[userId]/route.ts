import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userProfileSchema } from "@/lib/validations/userProfile"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function CRUDUserProfile(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    console.log('userProfile/[userId] : ',context);
    const { params } = routeContextSchema.parse(context)
    console.log('userProfile/[userId] params: ',params);
    

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userProfileSchema.parse(body)

    if (req.method === "POST") {
        // Create the userProfile.
        await db.userProfile.create({
        //   where: {
        //     id: session.user.id,
        //   },
          data: {
            welcomeMsg: payload.welcomeMsg,
            User: { connect: { id: session.user.id } }
          },
        })
      }


    return new Response(null, { status: 200 })




  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
