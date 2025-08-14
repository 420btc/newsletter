"use server"

import { type ActionResult, error, success } from "./utils"
import { newsletterSchema } from "./schema"

export const subscribe = async (email: string): Promise<ActionResult<string>> => {
  const parsed = newsletterSchema.safeParse({ email })

  if (!parsed.success) {
    return error("Please enter a valid email address")
  }

  try {
    // TODO: Add EmailJS sending logic here
    // Example:
    // await emailjs.send('service_id', 'template_id', {
    //   to_email: parsed.data.email,
    //   message: 'Welcome to our newsletter!'
    // });

    return success("Thank you for subscribing!")
  } catch (err) {
    return error("Error subscribing to newsletter")
  }
}
