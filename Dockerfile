# Use the base node image from Docker Hub
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Build the frontend
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Use a smaller base image for the runtime
FROM golang:alpine AS server-build
WORKDIR /server
COPY server.go .
COPY "go*" .
# Add other Go files and dependencies as needed
RUN go build -o server .

# Final stage: Copy the frontend and Go server into a new image
FROM alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=server-build /server/server ./server
ENV PORT=8080
# Expose the port your Go server listens on
EXPOSE 8080
CMD ["./server"]