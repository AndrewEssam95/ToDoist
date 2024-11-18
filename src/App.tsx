import { useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const [currentCategory, setCurrentCategory] = useState("1");

  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="flex items-start justify-between mt-4 min-h-full">
          <Sidebar
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
          <Content currentCategory={currentCategory} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
