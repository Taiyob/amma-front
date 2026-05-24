# --- Stage 1: Builder ---
# Use a more stable debian-based Bun image for building
FROM oven/bun:debian AS builder

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# 1. Install production deps
RUN bun install --frozen-lockfile --production

# 2. ADD THIS LINE: Explicitly install typescript for next.config.ts support
RUN bun add -d typescript

# Copy the rest of the application source code
COPY . .

# Add build-time arguments for environment variables here so they don't break installation cache
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_API

# Set environment variables for the build process
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_API=$NEXT_PUBLIC_BASE_API
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build the Next.js application
RUN bun run build


# --- Stage 2: Runner ---
# Use debian-based Bun image for consistency
FROM oven/bun:debian

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_PACKAGE_MANAGER=bun

# Copy only the necessary production dependencies configuration
COPY --from=builder /app/package.json ./package.json

# Install *only* production dependencies
RUN bun install --frozen-lockfile --production && \
  bun add -d typescript

# Copy the built Next.js application assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the port the app will run on
EXPOSE 3000

# The command to start the Next.js server using Bun
CMD ["bun", "run", "start"]
