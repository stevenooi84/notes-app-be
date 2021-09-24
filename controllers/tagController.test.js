const { getAllTags, deleteAllTags } = require('./tagController');
const tag = require('../models/Tag');

jest.mock('../models/Tag', () => ({
  find: jest.fn().mockReturnThis(),
  distinct: jest.fn().mockReturnValue(['data']),
  deleteMany: jest.fn().mockReturnValue(['data']),
}));
describe('tagController', () => {
  let mRes;
  let mReq;
  beforeAll(() => {
    mReq = {};
    mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  it('should return data successfully with getAllTags', async () => {
    await getAllTags(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      results: 1,
      data: {
        tags: [
          'data'
      ]},
    });
  });

  it('should return data successfully with getAllTags', async () => {
    await deleteAllTags(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      note: ['data'],
    });
  });
});