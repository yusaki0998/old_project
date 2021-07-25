/** @format */

import { Suspense } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function LazyLoadWrapper({ children }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

export default LazyLoadWrapper;
