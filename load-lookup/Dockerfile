FROM public.ecr.aws/lambda/nodejs:20

# Lambda runtime looks for code under /var/task
WORKDIR /var/task

# Install deps (include dev deps so tsc is available to build)
COPY package*.json ./
RUN npm ci

# Copy tsconfig and source, then build to dist/
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Tell Lambda which module.export to invoke (no .js extension)
# This looks for /var/task/dist/app.js -> export "lambdaHandler"
CMD ["dist/app.lambdaHandler"]
