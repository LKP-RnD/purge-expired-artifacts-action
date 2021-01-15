import {getOwner, getRepo, hasExpired} from './helpers';
const today = new Date();
const yesterday = (new Date()).setDate(today.getDate() - 1);
const tomorrow = (new Date()).setDate(today.getDate() + 1);

const expiredArtifact = {id: 1, expires: yesterday, name: ''};
const liveArtifact = {id: 1, expires: tomorrow, name: ''};

describe('Helpers', () => {
  describe('hasExpired', () => {
    it('Should return true for expired artifacts', () => {
      expect(hasExpired(expiredArtifact)).toBe(true);
    });
    it('Should return false for live artifacts', () => {
      expect(hasExpired(liveArtifact)).toBe(false);
    });
  });

  describe('getOwner', () => {
    it('Should return the owner given a repository string',() => {
      expect(getOwner('user/repo')).toBe('user');
    });
    it('Should throw given a faulty string',() => {
      expect(() => getOwner('userrepo')).toThrow();
      expect(() => getOwner('')).toThrow();
      expect(() => getOwner('u/l/a')).toThrow();
    });
  });

  describe('getRepo', () => {
    it('Should return the repository name given a repository string',() => {
      expect(getRepo('user/repo')).toBe('repo');
    });
    it('Should throw given a faulty string',() => {
      expect(() => getRepo('userrepo')).toThrow();
      expect(() => getRepo('u/l/a')).toThrow();
      expect(() => getRepo('')).toThrow();
    });
  });
});
