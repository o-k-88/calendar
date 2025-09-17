import { useEffect, useState } from "react";
import { getOauthToken } from "../helpers";

import { TOKEN_OBJECT_STRINGIFY, API_HOST } from "../const/";
import { categoriesEventsUrl } from "../const/";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([
    { value: "All Categories", label: "All Categories" },
  ]);
  useEffect(() => {
    getOauthToken(API_HOST, TOKEN_OBJECT_STRINGIFY).then((data) => {
      const url = categoriesEventsUrl(API_HOST);

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const formattedCategories = data?.map((item) =>
            item.name.includes("&#039;") ? item.name.replace("&#039;", "'") : item.name
          );
          const selectCategories = formattedCategories.map((item) => ({
            value: item,
            label: item,
          }));
          const categories = [
            { value: "All Categories", label: "All Categories" },
            ...selectCategories,
          ];

          setCategories(categories);
        });
    });
  }, []);
  return categories;
};
