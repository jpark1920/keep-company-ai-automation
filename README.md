# AI-Powered Documentation Triage

This project is a prototype for an automated DevOps workflow designed for the **Keep Company** Customer Engineering internship.

## Overview
It uses **Node.js** and **GitHub Actions** to monitor Pull Requests. When a PR is opened, the system analyzes the title to detect "documentation drift"—identifying if the changes require updates to internal runbooks or client-facing docs.

## Tech Stack
- **AI:** Anthropic Claude 3.5 Sonnet
- **Runtime:** Node.js
- **CI/CD:** GitHub Actions

## How it Works
1. A developer opens a Pull Request.
2. GitHub Actions triggers `triage.js`.
3. The script passes the PR context to Claude (or a simulation layer) for analysis.
4. Analysis is logged in the Action output for engineers to review.
