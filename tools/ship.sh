#!/usr/bin/env bash
# Publish the current feature branch: push it, then fast-forward main to it.
#
#   tools/ship.sh
#
# The deploy runs only on a push to main, and main must stay identical to the
# feature branch (CLAUDE.md, Workflow). This is that sequence with the checks
# that make it safe, so none of them depends on remembering:
#
#   - refuses to run on main itself, or with uncommitted changes
#   - runs the quick verify (data, generated files, SEO) before pushing
#   - refuses if main has commits this branch lacks, instead of overwriting
#     them; merge origin/main into the branch and run again
#   - retries network pushes with backoff (2s, 4s, 8s, 16s)
#
# It does not run the full browser suite; run `node tools/verify.js` first.
set -euo pipefail
cd "$(dirname "$0")/.."

branch=$(git branch --show-current)
if [ -z "$branch" ] || [ "$branch" = "main" ]; then
  echo "✗ run this from the feature branch, not main (currently: ${branch:-detached HEAD})"; exit 1
fi
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "✗ uncommitted changes; commit them first"; git status --short; exit 1
fi

node tools/verify.js --quick

retry() {
  local n=0 delay=2
  until "$@"; do
    n=$((n + 1))
    if [ "$n" -ge 5 ]; then echo "✗ gave up after $n attempts: $*"; return 1; fi
    echo "  retrying in ${delay}s…"; sleep "$delay"; delay=$((delay * 2))
  done
}

retry git push -u origin "$branch"
retry git fetch origin main
if ! git merge-base --is-ancestor origin/main HEAD; then
  echo "✗ origin/main has commits that $branch does not. Run: git merge origin/main, verify, then ship again."
  exit 1
fi
retry git push origin HEAD:main

echo
echo "✓ shipped $(git rev-parse --short HEAD): $branch and main are identical."
echo "  'Deploy to GitHub Pages' is now running; it should be the ONLY deploy in the Actions"
echo "  list. If 'pages build and deployment' also appears, the repo's Pages source has been"
echo "  switched back to a branch and the whole branch, tools/ included, is being published."
