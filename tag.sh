VERSION=$(cat package.json | jq -r .version) && git tag $VERSION && git push --tags
