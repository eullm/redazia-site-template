#!/bin/sh
# Brings the changes of the Redazia template into a site made from it, on a
# new branch, leaving alone what belongs to the site: site.config.mjs,
# src/custom/, the articles, the pictures, public/brand/, the READMEs and
# .github/. Run every week by .github/workflows/template-update.yml, which
# then opens a pull request; it also runs by hand from the site's folder:
#
#   sh scripts/template-update.sh
#
# The last template version brought in is in .template-version. The first
# time it is found by itself: the template commit whose files are those of
# the site's first commit ("Use this template" copies them as they are).
#
# Output (for the workflow): a line "branch=<name>" when there is something
# to bring in, "conflicts=<files>" when some files need a person, nothing
# when the site is up to date.
set -eu

TEMPLATE=${TEMPLATE_REPO:-https://github.com/redazia/redazia-site-template.git}
KEEP=":(exclude)site.config.mjs :(exclude)src/custom :(exclude)src/content/articles :(exclude)public/images :(exclude)public/brand :(exclude).github :(exclude)README.md :(exclude)README.it.md :(exclude).template-version"

git remote get-url template >/dev/null 2>&1 || git remote add template "$TEMPLATE"
git fetch --quiet template main
new=$(git rev-parse template/main)

if [ -s .template-version ]; then
  base=$(cat .template-version)
else
  root_tree=$(git rev-list --max-parents=0 HEAD | tail -n 1 | xargs -I{} git rev-parse {}^{tree})
  base=$(git log --format='%H %T' template/main | awk -v t="$root_tree" '$2 == t { print $1; exit }')
  if [ -z "$base" ]; then
    echo "The template version this site started from was not found: write its commit in .template-version." >&2
    exit 1
  fi
fi

[ "$base" = "$new" ] && exit 0

branch="template-update-$(git rev-parse --short "$new")"
git checkout --quiet -B "$branch"
patch=$(mktemp)
# shellcheck disable=SC2086
git diff --binary "$base" "$new" -- . $KEEP > "$patch"
conflicts=""
if [ -s "$patch" ] && ! git apply --3way --index "$patch" 2>/dev/null; then
  conflicts=$(git diff --name-only --diff-filter=U | tr '\n' ' ')
  git add -A
fi
rm -f "$patch"
echo "$new" > .template-version
git add .template-version
git -c user.name="${GIT_AUTHOR_NAME:-Redazia template}" -c user.email="${GIT_AUTHOR_EMAIL:-noreply@redazia.com}" \
  commit --quiet -m "Template update to $(git rev-parse --short "$new")"
echo "branch=$branch"
echo "base=$base"
echo "new=$new"
[ -n "$conflicts" ] && echo "conflicts=$conflicts"
exit 0
