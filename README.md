# dompet-garuda-ui

Public marketing site for Dompet Digital. See `CLAUDE.md` for the full project
context and `docs/BUILD_PLAN.md` for the phased build plan.

## Development

```bash
bun install
bun dev
```

## Deployment

This repo builds and pushes a Docker image to GHCR
(`ghcr.io/fai88al/dompet-garuda-ui:latest`) via `.github/workflows/deploy.yml`
on every push to `main`, then SSHes into the VPS and runs
`docker compose up -d landing`.

Required repo secrets (same names as the other Dompet Digital repos):

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`

### Manual steps required in the BACKEND repo

**This repo's workflow does NOT touch the backend repo.** Before the first
deploy can go live, someone needs to make the following changes there by hand:

1. Add a `landing` service to `docker-compose.prod.yml`:

   ```yaml
   landing:
     image: ghcr.io/fai88al/dompet-garuda-ui:latest
     container_name: dompet-landing
     restart: unless-stopped
     expose:
       - "3000"
   ```

2. Add the following two blocks to the Caddyfile (root canonical, `www`
   redirects to root — confirm this direction is still correct before
   applying; see CLAUDE.md §8):

   ```caddyfile
   www.dompetgaruda.com {
       redir https://dompetgaruda.com{uri} permanent
   }

   dompetgaruda.com {
       reverse_proxy landing:3000
   }
   ```

3. Add DNS A records, both pointing to `72.60.74.117`:

   | Type | Name | Value           |
   | ---- | ---- | --------------- |
   | A    | @    | 72.60.74.117    |
   | A    | www  | 72.60.74.117    |

4. Commit and push the backend repo changes, and wait for its pipeline to
   deploy the updated Caddy config.

5. Wait for DNS propagation (`nslookup dompetgaruda.com` /
   `nslookup www.dompetgaruda.com`).

6. Trigger this repo's `Deploy` workflow (push to `main`, or run it manually
   via `workflow_dispatch`).

7. Verify: `curl -sf https://dompetgaruda.com` and
   `curl -sf https://www.dompetgaruda.com` (should redirect to root) both
   succeed, and Caddy has obtained valid certs for both domains.
