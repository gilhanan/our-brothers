import { SeniorityPipe } from './seniority.pipe';

describe('SeniorityPipe', () => {
  it('create an instance', () => {
    const pipe = new SeniorityPipe();
    expect(pipe).toBeTruthy();
  });
});
