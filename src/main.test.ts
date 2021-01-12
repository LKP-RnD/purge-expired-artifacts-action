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
      listRunArtifactsError: new Error('Test error')
    });
  });

  it('should set error when starting without necessary parameters', async () => {
    o.setupMock({
      listRunArtifactsResponse: [],
      listRunArtifactsError: new Error('Test error')
    });
    const setFailedSpy = jest.spyOn(core, 'setFailed');
    const m = new Main;
    await m.runAction();
    expect(setFailedSpy).toHaveBeenCalled();
  });
});
