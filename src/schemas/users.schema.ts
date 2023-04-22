import { z } from "zod";


export namespace Users {
  export const actionSchema = z.object({
    actionType: z.enum(["delete", "block", "unblock"]),
    ids: z.number().array().nonempty({ message: "The list of identifiers should not be empty" })
  })

  export type ActionSchema = typeof actionSchema
  export type ActionBody = z.infer<ActionSchema>
}
