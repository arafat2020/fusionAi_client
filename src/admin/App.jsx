import * as React from "react";


const App = () => {
  React.useEffect(() => {
    const nav = document.getElementById("nav");
    nav.classList.add('hidden')
  }, []);
  return (
    <div>admin</div>
  );
};

export default App;
