import * as core from '@actions/core';
import {Logger} from './logger-base';
import {setupTestLogger} from './test.helpers';

import {Container} from 'typedi';
import {Main} from './main';
import {OctokitHelper} from './octokit-helper';
import {OctokitHelperMock} from './octokit-helper.mock';

describe('Main', () => {
  let o:  OctokitHelperMock;
  beforeAll(()=>{
    const { logger } = setupTestLogger();
    Container.set(Logger, logger);
    o = new OctokitHelperMock();
    Container.set(OctokitHelper, o);
    o.setupMock({
      listRunArtifactsResponse: [],
      listRunArtifactsError: new Error('Test error'),
      delteExpiredArtifactsError: null
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should setFailed when unable to list artifacts', async () => {
    o.setupMock({
      listRunArtifactsResponse: [],
      listRunArtifactsError: new Error('List error'),
      delteExpiredArtifactsError: null
    });
    const setFailedSpy = jest.spyOn(core, 'setFailed');
    const m = new Main;
    await m.runAction();
    expect(setFailedSpy).toHaveBeenCalled();
  });

  it('should setFailed when unable to delete artifacts', async () => {
    o.setupMock({
      listRunArtifactsResponse: [{ Id: 1, expires: 0}],
      listRunArtifactsError: null,
      delteExpiredArtifactsError: new Error('Delete error')
    });
    const setFailedSpy = jest.spyOn(core, 'setFailed');
    const m = new Main;
    await m.runAction();
    expect(setFailedSpy).toHaveBeenCalled();
  });

  it('should NOT setFailed when artifacts deleted', async () => {
    process.env.INPUT_REPO_TO_PURGE = 'github-user/hello-world';
    o.setupMock({
      listRunArtifactsResponse: [{ Id: 1, expires: 0}],
      listRunArtifactsError: null,
      delteExpiredArtifactsError: null
    });
    const setFailedSpy = jest.spyOn(core, 'setFailed');
    const m = new Main;
    await m.runAction();
    expect(setFailedSpy).not.toHaveBeenCalled();
    expect(o.calls[0].params.repo).toBe('hello-world');
    expect(o.calls[0].params.owner).toBe('github-user');
  });
});
