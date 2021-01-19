**WARNING: This action will delete data. Use it with care and at your own risk.**

![testrun](https://github.com/LKP-RnD/purge-expired-artifacts-action/workflows/Build/badge.svg)

## Purge expired artifacts

This github action deletes all expired artifacts for a single github repository. It can be used to 
purge your expired artifacts and reduce the amount of github storage you use. To set an expiry time for artifacts you can use an artifact upload action that supports this or change the default expiry time for your repository.

##### Why is this useful?
Since github still count expired artifacts to your storage quota it is useful to remove old artifacts. Currently, expired artifacts are not removed automatically by github. This action can bee used to safely automate the tedious task of clearing your expired artifacts. 

## How to use
### Example (dry-run)
Will log the expired artifacts instead of deleting

```
name: 'Purge expired artifacts'
on:
  schedule:
    - cron: '0 * * * *'
jobs:
  purge-artifacts:
    runs-on: ubuntu-latest
    steps:
      - uses: LKP-RnD/purge-expired-artifacts-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repo_to_purge: "your-github-user-or-org/your-repo"
```

### Example (Actual-run)
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
      - uses: LKP-RnD/purge-expired-artifacts-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repo_to_purge: "your-github-user-or-org/your-repo"
          dry_run: "false"
```


## Inputs
### `repo_to_purge`
**Required** the github repo to purge of expired artifacts. Example: `"your-github-user-or-org/your-repo"`.

### `token`
**Required** the github token for your action. Use secrets.GITHUB_TOKEN as in the example.

### `dry_run`
**Default** dry run is enabled by default set it to ```"false"``` to enable delete mode.


## Outputs
Success or failure

## Common issues
If you have thousands of expired artifacts the action won't be able to delete everything in one go as githubs API has a rate limit. 
However, if you run it on a schedule as in the example every other hour you will eventually come to a point where the script will have cleared most unused artifacts and this will no longer cause problems.
