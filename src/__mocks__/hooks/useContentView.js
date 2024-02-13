const useContentView = () => ({
  displayedComponent: 'Home',
  setDisplayedComponent: jest.fn(),
  displayMap: false,
  setDisplayMap: jest.fn(),
  navbarColor: 'blue',
  setNavbarColor: jest.fn(),
  navbarLeftButton: 'back',
  setNavbarLeftButton: jest.fn(),
});

export default useContentView;
