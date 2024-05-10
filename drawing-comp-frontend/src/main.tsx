import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./index.css";

import IndexPage from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TeamOverview from "./pages/TeamOverview.tsx";
import ChallengeView from "./pages/Challenge.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "/team",
        element: <TeamOverview />,
    },
    {
        path: "challenge/:challengeId",
        element: <ChallengeView />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <main className="dark">
                    <Toaster
                        toastOptions={{
                            className: "bg-zinc-700 text-white",
                        }}
                        richColors
                    />
                    <RouterProvider router={router} />
                </main>
            </NextUIProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
