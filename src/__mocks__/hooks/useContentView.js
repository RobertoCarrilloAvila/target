const useContentView = () => ({
  displayedComponent: 'Home',
  setDisplayedComponent: jest.fn(),
  isMapVisible: false,
  setIsMapVisible: jest.fn(),
  navbarColor: 'blue',
  setNavbarColor: jest.fn(),
  navbarLeftButton: 'back',
  setNavbarLeftButton: jest.fn(),
});

export default useContentView;
