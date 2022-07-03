import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {store.auth === true ? (
        <div className="d-flex justify-content-center">
          <h1> Esta zona es privada </h1>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
