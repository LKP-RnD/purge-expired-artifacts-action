**WARNING: This action will delete data. Use it with care and at your own risk.**

![testrun](https://github.com/LKP-RnD/purge-expired-artifacts-action/workflows/build/badge.svg)

# delete-run-artifacts

This github action deletes all expired artifacts for a single github repository. It can be run to 
keep your github storage clean of expired run artifacts. To make sure your artifacts expire in time you can use
an artifact upload action that supports expire time or set a default expire time for your repository.

# How to use
Example

```
name: 'Purge expired artifacts'
on:
  schedule:
    - cron: '0 * * * *'
jobs:
  purge-artifacts:
    runs-on: ubuntu-latest
    steps:
      - uses: LKP-RnD/Purge-expired-artifact-actions@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
    with:
      repo_to_purge: "your-github-user-or-org/your-repo"
```

## Inputs

### `repo_to_purge`

**Required** the github repo to purge of expired artifacts. Example: `"your-github-user-or-org/your-repo"`.

## Outputs

Success or failure
