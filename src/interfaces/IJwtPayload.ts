import type { User } from '@prisma/client'

export interface IJwtPayload extends Pick<User, 'id'> { }
