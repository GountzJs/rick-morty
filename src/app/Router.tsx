import {
  createBrowserRouter
} from "react-router-dom";
import { CharacterPage } from "./character/pages/CharacterPage";
import { CharactersPage } from "./character/pages/CharactersPage";
import { EpisodePage } from "./episode/pages/EpisodePage";
import { EpisodesPage } from "./episode/pages/EpisodesPage";
import { HomePage } from "./home/Home";
import { LocationPage } from "./location/pages/LocationPage";
import { LocationsPage } from "./location/pages/LocationsPage";
import { BaseRouter } from "./shared/BaseRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseRouter children={<HomePage />} />,
  },
  {
    path: "/characters",
    element: <BaseRouter children={<CharactersPage />} />,
  },
  {
    path: '/character/:id',
    element: <BaseRouter children={<CharacterPage />} />,
  },
  {
    path: "/locations",
    element: <BaseRouter children={<LocationsPage />} />,
  },
  {
    path: "/location/:id",
    element: <BaseRouter children={<LocationPage />} />,
  },
  {
    path: "/episodes",
    element: <BaseRouter children={<EpisodesPage />} />,
  }, 
  {
    path: "/episode/:id",
    element: <BaseRouter children={<EpisodePage />} />,
  }
]);