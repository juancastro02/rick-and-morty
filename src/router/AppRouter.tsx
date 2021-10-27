import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CardPlanet from "../components/CardPlanet/CardPlanet";
import FormView from "../components/FormView/FormView";

const AppRouter = (): JSX.Element  => {
  return (
    <Switch>
      <Route exact path="/" component={FormView} />
      <Route exact path="/planet/:id" component={CardPlanet} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AppRouter;
