import httpClient from 'api/httpClient';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor } from '@testing-library/react';
import Chat from './Chat';

jest.mock('hooks/useContentView', () => () => ({
  displayedComponent: 'Home',
  goTo: jest.fn(),
  isMapVisible: false,
  setIsMapVisible: jest.fn(),
  navbarColor: 'blue',
  setNavbarColor: jest.fn(),
  navbarLeftButton: 'back',
  setNavbarLeftButton: jest.fn(),
}));

const mock = new MockAdapter(httpClient);

const conversations = {
  matches: [
    {
      match_id: 1,
      topic_icon: '/topic/icon/1/eb7bf9f2-62be-451c-af5b-5b41150eef1c.jpg',
      last_message: 'Hi!',
      unread_messages: 2,
      user: {
        id: 1,
        full_name: 'Jon Doe',
        avatar: {
          original_url:
            '/topic/icon/1/eb7bf9f2-62be-451c-af5b-5b41150eef1c.jpg',
          normal_url: '/topic/icon/1/eb7bf9f2-62be-451c-af5b-5b41150eef1c.jpg',
          small_thumb_url:
            '/topic/icon/1/eb7bf9f2-62be-451c-af5b-5b41150eef1c.jpg',
        },
      },
    },
  ],
};

mock
  .onGet(`${process.env.REACT_APP_API_HOST}/match_conversations`)
  .reply(200, conversations);

test('displays chats received from the server', async () => {
  render(<Chat />);

  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1));
});
