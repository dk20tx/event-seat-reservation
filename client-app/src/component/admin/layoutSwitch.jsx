import React, { createContext, useContext, useState } from 'react';
export { LayoutSwitch, Options, Button, Content };

const LayoutContext = createContext();

function LayoutSwitch({ children, defaultLayout }) {
  const [activeLayout, setActiveLayout] = useState(defaultLayout);
  const value = {
    activeLayout,
    setActiveLayout,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}
function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      `Components that require LayoutContext must be children of LayoutSwitch component`
    );
  }
  return context;
} 
function Content({ children }) {
  const { activeLayout } = useLayoutContext();
  return (
    <React.Fragment>
      {children.map(child => {
        if (child.props.activeLayout !== activeLayout) return null;
        return child;
      })}
    </React.Fragment>
  );
}
function Button({ children, layoutPreference, title }) {
  const { activeLayout, setActiveLayout } = useLayoutContext();
  return (
    <button
      className={`layout-btn ${
        activeLayout === layoutPreference ? 'active' : ''
      }`}
      onClick={() => setActiveLayout(layoutPreference)}
      title={title}
    >
      {children}
    </button>
  );
}
function Options({ children }) {
  return (
    <div className="layout-switch-container d-flex justify-content-between">
      <div className='my-3 '>
        <button className='btn btn-primary border-0 d-flex flex-nowrap align-items-center bg-secondary'>
          <i class="fa-solid fa-left"></i>
          
          <span className='ms-2 '>Go back</span>
        </button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}