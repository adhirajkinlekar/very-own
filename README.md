# veryown

**veryown** is a customizable, all-in-one platform for building and managing services like teaching academies, online stores, and more — similar to Shopify, but built for service-based businesses with flexibility in mind.

Watch a full demo of the platform on YouTube:
👉 veryown Platform Demo - https://www.youtube.com/watch?v=mk-yHecaxBg


---

## 🚀 Features

- 🏗️ **Modular Microservice Architecture**
- 🧩 **Composable Microfrontends**
- 🔐 **Single Sign-On (SSO) for seamless user experience**
- 📦 **Containerized with Docker**
- ☸️ **Orchestrated with Kubernetes**
- ☁️ **Deployed on Google Cloud Platform**
- 🧠 **Customizable for multiple use cases like e-learning, ecommerce, and more**

---

## 🧱 Architecture Overview

### Microservices

- Each core function (auth, catalog, orders, content, payments, etc.) is a separate service.
- Built with .NET and JavaScript-based APIs.
- Communicate via REST + lightweight pub/sub.

### Microfrontends

- Frontend is composed of independently developed and deployed UI fragments.
- Uses modern JavaScript frameworks like React or Angular.
- Integrated using module federation.

### Authentication & SSO

- Centralized identity provider supports:
  - SSO across all services 
  - Multi-tenant aware authentication
- Users can manage one or more "organizations" (tenants) with scoped permissions.

### Docker & Kubernetes

- All services are containerized via Docker for local development and portability.
- Kubernetes handles:
  - Pod orchestration & service discovery
  - Auto-scaling & rolling deployments
  - Multi-tenant routing
  - Secret and config management
  - Cluster-level observability (e.g., Prometheus, Grafana)

### Reverse Proxy & Routing

- Kubernetes Ingress and NGINX act as the edge proxy to:
  - Route traffic to the appropriate frontend or microservice
  - Enforce TLS and handle HTTPS termination
  - Enable path-based and subdomain-based routing per tenant
  - Serve and cache static assets efficiently

- Node.js Reverse Proxy:
  - Used internally to dynamically route requests based on subdomains (e.g., academy.veryown.com, store.veryown.com)
  - Supports tenant-specific logic and middleware (e.g., custom headers, auth context, rate limiting)

---

## 🧑‍💻 Tech Stack

| Layer        | Tools Used                             |
|--------------|----------------------------------------|
| Frontend     | React / Vue / Webpack Module Federation|
| Backend      | .NET APIs (C#), Node.js                |
| Auth         | JSON Web Tokens                        |
| Container    | Docker                                 |
| Orchestration| Kubernetes                             |
| Cloud        | Google Cloud (GKE, GCS, Pub/Sub, etc.) |
| CI/CD        | GitHub Actions / Google Cloud Build    |

---

## 🔄 Multi-Tenant Support

- Every service is **tenant-aware** with scoped data isolation.
- Routing handled via subdomains or path-based strategies.
- Configurations per tenant (e.g., themes, features, auth rules).

--- 