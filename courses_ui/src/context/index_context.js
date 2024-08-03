import { createContext } from 'react';


// Create a Context object
// The Context API in React is a way to manage state globally across components without passing props down manually at every level. 
// It allows you to create a "context" that can be shared among components, making it easier to manage state and avoid "prop drilling."

const AcademyContext = createContext();


export default AcademyContext;