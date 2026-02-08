# ==============================
# Makefile for komodo monorepo
# ==============================

# Variables
DOCKER_COMPOSE:=docker compose
DOCS_SERVICE:=docusaurus
REPO_PATH:=/etc/komodo/repos/aboulbox
ENV_FILE:=.env.build

# ------------------------------
# Pre-commit (run fast checks / builds)
# ------------------------------
.PHONY: pre-commit
pre-commit: docs
	@echo "✅ Pre-commit checks done"

# ------------------------------
# Documentation
# ------------------------------
.PHONY: docs
docs: 
	@echo "📘 Building Docusaurus docs..."
	docker compose -p dev_docs_docusaurus stop && \
	cd ./docs/docusaurus && \
	$(DOCKER_COMPOSE) -f docker-compose.yml --env-file $(ENV_FILE) run --rm \
	$(DOCS_SERVICE) sh -c "npm ci && npm run build-prod" && \
	docker compose -p dev_docs_docusaurus start 

	@echo "✅ Docusaurus build complete!"
