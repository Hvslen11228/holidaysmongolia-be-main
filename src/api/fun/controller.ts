import { Request, Response } from "express";
import {
  service_find_where as category_service_find,
  service_find,
} from "../services/category/service";
import { service_find_where as complex_service_find } from "../services/complex/service";
export const menu = async (req: any, res: Response) => {
  let lang = req.get("Accept-Language");
  if (lang) {
    if (lang != "en" && lang != "any") {
      lang = "en";
    }
  }
  const category = await category_service_find({ lang: "en" }, {});
  const complex = await complex_service_find({ lang: "en" }, {});
  const category2 = await category_service_find({ lang: "any" }, {});
  const complex2 = await complex_service_find({ lang: "any" }, {});
  const menu1 = [
    {
      id: "",
      href: "",
      name: "Home",
      isNew: true,
    },
    {
      id: "",
      href: "#",
      name: "Tours",
      type: "megaMenu",
      megaMenu: [...category],
    },
    {
      id: "",
      href: "#",
      name: "Complex",
      type: "dropdown",
      isNew: true,
      children: [...complex],
    },
    // {
    //   id: "",
    //   href: "/event",
    //   name: "Event",
    // },
    {
      id: "",
      href: "#",
      name: "News, Blog",
      type: "dropdown",
      children: [
        {
          id: 1,
          href: "/news",
          name: "News",
        },
        {
          id: 1,
          href: "/blog",
          name: "Blog",
        },
      ],
    },
    {
      id: "",
      href: "/about",
      name: "About",
    },
    {
      id: "",
      href: "/xanadu",
      name: "Xanadu",
    },
  ];
  const menu2 = [
    {
      id: "",
      href: "",
      name: "Нүүр",
      isNew: true,
    },
    {
      id: "",
      href: "#",
      name: "Аялал",
      type: "megaMenu",
      megaMenu: [...category2],
    },
    {
      id: "",
      href: "#",
      name: "Цогцолбор",
      type: "dropdown",
      isNew: true,
      children: [...complex2],
    },
    // {
    //   id: "",
    //   href: "/event",
    //   name: "Event",
    // },
    {
      id: "",
      href: "#",
      name: "Мэдээ, блог",
      type: "dropdown",
      children: [
        {
          id: 1,
          href: "/news",
          name: "Мэдээ",
        },
        {
          id: 1,
          href: "/blog",
          name: "Блог",
        },
      ],
    },
    {
      id: "",
      href: "/about",
      name: "Тухай",
    },
    {
      id: "",
      href: "/xanadu",
      name: "Xanadu",
    },
  ];
  return res.status(200).json({
    success: true,
    message: "Амжилттай",
    data: { first_language: menu1, second_language: menu2 },
  });
};
export const location = async (req: any, res: Response) => {
  let lang = req.get("Accept-Language");
  if (lang) {
    if (lang != "en" && lang != "any") {
      lang = "en";
    }
  }
  const category = await service_find({ lang: lang }, {});
  const data: any = [];
  await category.forEach(async (el: any) => {
    await data.push(el.name);
  });
  return res.status(200).json({
    success: true,
    message: "Амжилттай",
    data: data,
  });
};
