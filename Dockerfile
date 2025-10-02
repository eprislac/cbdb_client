# Make sure it uses up to date node js version
FROM node:22-alpine

RUN apk add --no-cache libc6-compat
# If you still run into build issue, go to "Problem #3: Making /app is read only.
# in case you have permission issues.
WORKDIR /app

COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

ENV NODE_ENV=development
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
# ENV AUTH0_ISSUER=${AUTH0_ISSUER}
# ENV AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
# ENV AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
# ENV AUTH0_AUDIENCE=${AUTH0_AUDIENCE}
# ENV AUTH0_SCOPE=${AUTH0_SCOPE}
# ENV APP_SECRET=${APP_SECRET}
CMD ["pnpm", "run", "dev"]
