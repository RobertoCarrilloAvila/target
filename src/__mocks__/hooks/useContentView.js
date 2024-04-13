export const mockGoTo = jest.fn();

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

export default useContentView;
