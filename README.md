**WARNING: This action will delete data. Use it with care and at your own risk.**

![testrun](https://github.com/LKP-RnD/purge-expired-artifacts-action/workflows/Build/badge.svg)

# delete-run-artifacts

This github action deletes all expired artifacts for a single github repository. It can be run to 
keep your github storage clean of expired run artifacts. To make sure your artifacts expire in time you can use
an artifact upload action that supports expire time or set a default expire time for your repository.

# How to use
### Example (Dry-run)
Will log the expired artifcts instead of deleting

```
name: 'Purge expired artifacts'
on:
  schedule:
    - cron: '0 * * * *'
jobs:
  purge-artifacts:
    runs-on: ubuntu-latest
    steps:
      - uses: LKP-RnD/purge-expired-artifacts-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repo_to_purge: "your-github-user-or-org/your-repo"
```

Example (Actual-run)
Will delete all expired artifacts.
```
name: 'Purge expired artifacts'
on:
  schedule:
    - cron: '0 * * * *'
jobs:
  purge-artifacts:
    runs-on: ubuntu-latest
    steps:
      - uses: LKP-RnD/purge-expired-artifacts-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repo_to_purge: "your-github-user-or-org/your-repo"
          dry_run: "false"
```


## Inputs

### `repo_to_purge`

**Required** the github repo to purge of expired artifacts. Example: `"your-github-user-or-org/your-repo"`.

## Outputs

Success or failure
