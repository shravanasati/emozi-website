# Use the base node image from Docker Hub
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Build the frontend
COPY "package*" .
COPY "pnpm-lock.yaml" .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Use a smaller base image for the runtime
FROM golang:alpine AS server-build
WORKDIR /server
COPY "go*" .
RUN go mod download
COPY "*.go" .
RUN go build -o server

# Final stage: Copy the frontend and Go server into a new image
FROM alpine
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=server-build /server/server ./server
ENV PORT=8080
# Expose the port your Go server listens on
EXPOSE 8080
CMD ["./server"]