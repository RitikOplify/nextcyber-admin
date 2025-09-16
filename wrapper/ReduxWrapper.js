"use client";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const ReduxWrapper = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "text-base",
            duration: 2000,
          }}
          containerStyle={{
            top: 7,
            left: 7,
            bottom: 7,
            right: 7,
          }}
        />
      </Provider>
    </>
  );
};

export default ReduxWrapper;
