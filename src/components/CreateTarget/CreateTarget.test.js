import { render, screen, waitFor } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { MapContext } from 'contexts/MapContext';
import CreateTarget from './CreateTarget';

const mapProperties = {
  selectedRadius: 100,
  selectedLocation: { lat: 10, lng: 10 },
};

const values = {
  mapProperties,
  setMapProperties: jest.fn(),
  targets: [],
  setTargets: jest.fn(),
};

const mockGoTo = jest.fn();

const useContentView = () => ({
  displayedComponent: 'Home',
  goTo: mockGoTo,
  isMapVisible: false,
  setIsMapVisible: jest.fn(),
  navbarColor: 'blue',
  setNavbarColor: jest.fn(),
  navbarLeftButton: 'back',
  setNavbarLeftButton: jest.fn(),
});

jest.mock('hooks/useContentView', () => useContentView);

const CreateTargetHarness = ({ values }) => (
  <MapContext.Provider value={values}>
    <CreateTarget />
  </MapContext.Provider>
);

beforeAll(() => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementation((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 10,
            longitude: 10,
          },
        }),
      ),
    ),
  };
});

jest.mock('services/topicsService', () => ({
  getTopics: async () => [
    {
      topic: {
        id: 1,
        label: 'topic 1',
        icon: '/topic/icon/1/example.jpg',
      },
    },
    {
      topic: {
        id: 2,
        label: 'topic 2',
        icon: '/topic/icon/2/example.jpg',
      },
    },
  ],
}));

const mockCreateTarget = {
  target: {
    id: 9,
    title: 'new target',
    lat: 27.5566,
    lng: 78.5566,
    radius: 27384.4,
    topic: {
      id: 3,
      icon: '/topic/icon/3/fc916c11-06f6-49a4-8d94-f70e55f977e9.jpeg',
      label: 'Dogs',
    },
  },
};
jest.mock('services/targetsService', () => ({
  create: async () => mockCreateTarget,
  getTargets: async () => [
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
}));

test('has radius input', () => {
  render(<CreateTargetHarness values={values} />, { wrapper: BrowserRouter });

  const radius = screen.getByRole('spinbutton');
  expect(radius).toBeInTheDocument();
});

test('has title input', () => {
  render(<CreateTargetHarness values={values} />, { wrapper: BrowserRouter });

  const title = screen.getByRole('textbox');
  expect(title).toBeInTheDocument();
});

test('has topic select and options', async () => {
  render(<CreateTargetHarness values={values} />, { wrapper: BrowserRouter });

  const topic = screen.getByRole('combobox');

  expect(topic).toBeInTheDocument();
  await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(3));
});

test('submit form', async () => {
  const mapProperties = {
    selectedRadius: 100,
    selectedLocation: { lat: 10, lng: 10 },
  };
  const values = {
    mapProperties,
    setMapProperties: jest.fn(),
    targets: [],
    setTargets: jest.fn(),
  };
  render(<CreateTargetHarness values={values} />, { wrapper: BrowserRouter });

  const user = userEvent.setup();
  const radius = screen.getByRole('spinbutton');
  const title = screen.getByRole('textbox');
  const topic = screen.getByRole('combobox');
  const submitButton = screen.getByRole('button');

  await user.type(radius, '10');
  await user.type(title, 'Test');
  await waitFor(() => user.selectOptions(topic, '1'));
  await user.click(submitButton);

  expect(mockGoTo).toHaveBeenCalled();
});
