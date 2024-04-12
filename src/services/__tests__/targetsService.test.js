import httpClient from 'api/httpClient';
import MockAdapter from 'axios-mock-adapter';

import targetsService from 'services/targetsService';

const mock = new MockAdapter(httpClient);

describe('create target', () => {
  const createRequest = {
    title: 'new target',
    radius: 27384.4,
    topic_id: 2,
    latitude: -94.5566,
    longitude: -94.5566,
  };
  const createresponse = { target: createRequest };

  it('creates a target successfully', async () => {
    mock
      .onPost(`${process.env.REACT_APP_API_HOST}/targets`, createRequest)
      .reply(200, createresponse);

    const result = await targetsService.create(createRequest);
    expect(result).toEqual(createresponse);
  });

  it('returns false when create target fails', async () => {
    mock
      .onPost(`${process.env.REACT_APP_API_HOST}/targets`, createRequest)
      .networkError();

    const result = await targetsService.create(createRequest);
    expect(result).toEqual(false);
  });
});

describe('get targets', () => {
  const targets = {
    targets: [
      {
        target: {
          id: 3,
          title: 'new target',
          latitude: -54.2874,
          longitude: 23.28394,
          radius: 234,
          topic: {
            id: 3,
            icon: '/topic/icon/3/fc916c11-06f6-49a4-8d94-f70e55f977e9.jpeg',
            label: 'Dogs',
          },
        },
      },
    ],
  };

  it('get targets successfully', async () => {
    mock.onGet(`${process.env.REACT_APP_API_HOST}/targets`).reply(200, targets);

    const result = await targetsService.getTargets();
    expect(result).toEqual(targets.targets);
  });

  it('returns empty array when get targets fails', async () => {
    mock.onGet(`${process.env.REACT_APP_API_HOST}/targets`).networkError();

    const result = await targetsService.getTargets();
    expect(result).toEqual([]);
  });
});

describe('delete target', () => {
  it('deletes a target successfully', async () => {
    mock.onDelete(`${process.env.REACT_APP_API_HOST}/targets/2`).reply(204);

    const result = await targetsService.delete(2);
    expect(result).toEqual(true);
  });

  it('returns false when delete target fails', async () => {
    mock.onDelete(`${process.env.REACT_APP_API_HOST}/targets/2`).networkError();

    const result = await targetsService.delete(2);
    expect(result).toEqual(false);
  });
});
