import * as z from "zod"


export const userProfileSchema = z.object({
    welcomeMsg: z.string(),
    profileImg: z.string()
})


