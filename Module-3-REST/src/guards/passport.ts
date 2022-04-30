import {Unauthorized} from 'http-errors'
import passport from "passport"
import {ExtractJwt, Strategy} from 'passport-jwt'
import { prisma } from "../prisma"

const options = 
{
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string,
}
passport.use(
    new Strategy(options,
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
  
        // this will pass in the user object only with the uuid property to the request object
        return done(null, token.user)
      },
    ),
  )
