import React from "react";
import { Routes, Route } from "react-router-dom";
import { globalRoutes } from "./globalRoutes";

const Index = (props) => {
  const routeComponents = globalRoutes.map((item, key) => (
    <Route
      path={item.path}
      element={
        item.routeType ? (
          <item.routeType>
            <item.element {...props} />
          </item.routeType>
        ) : (
          <item.element {...props} />
        )
      }
      key={key}>
      {item.child &&
        item.child.map((itemChild, key) => <Route path={itemChild.path} element={<itemChild.element {...props} />} key={key} />)}
    </Route>
  ));

  return (
    <>
      <Routes>{routeComponents}</Routes>
    </>
  );
};

export default Index;
