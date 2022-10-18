import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Main = React.lazy(()=> import("./page/Main"))
const Loading = React.lazy(() => import("./components/Loding"));
const Content = React.lazy(() => import("./page/Content"))
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Suspense fallback={<Loading />}>
         <Routes>
          <Route
            path="/"
            element={<Main></Main>}
          />
           <Route
            path="/content/:id"
            element={<Content></Content>}
          />
         </Routes>
       </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
