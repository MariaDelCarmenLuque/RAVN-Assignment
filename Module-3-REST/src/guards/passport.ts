import {Unauthorized} from 'http-errors'
import passport from "passport"
import {ExtractJwt, Strategy} from 'passport-jwt'
import { prisma } from "../prisma"

passport.use(
    new Strategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY as string,
  },
      async (jwtPayload, done) => {
        const token = await prisma.token.findUnique({
          where: {
            jti: jwtPayload.sub,
          },
          select: {
            user: { select: { email: true, role:true } },
          },
          rejectOnNotFound: false,
        })
  
        if (!token) {
          return done(new Unauthorized('Invalid credentials'), null)
        }
        const user = token.user
        return done(null,{user})
      },
    ),
  )
